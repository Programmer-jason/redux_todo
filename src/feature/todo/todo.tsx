import { PayloadAction, createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from 'axios';

interface Data {
    data: [{ id: number, todos: string }],
    isLoading: boolean,
    error: string | null
}

export let initialState: Data = {
    data: [{ id: 2, todos: 'make a coffee' }],
    isLoading: false,
    error: null
}

export const fetchData = createAsyncThunk('todo/fetchData ', async () => {
    try {
        const response = await axios.get('http://localhost:3000/read')
        return response.data
    } catch (error) {
        console.log(error)
    }
});

const TodoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<{ id: number, todos: string }>) => {
            state.data.push({ id: action.payload.id, todos: action.payload.todos })
        },

        removeTodo: (state, action: PayloadAction<{ id: number }>) => {
            axios.delete(`http://localhost:3000/delete/${action.payload.id}`)
                .then((response) => {
                    console.log(response.data.message)
                }).catch((e) => {
                    console.log(e)
                })
            state.data.forEach((v, i) => v.id == action.payload.id ? state.data.splice(i, 1) : 'Nothing');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data
                // state.data.push(action.payload.data)
                // console.log(action.payload.data)
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as null
            });
    },

})

export const { addTodo, removeTodo } = TodoSlice.actions;
export default TodoSlice.reducer;

