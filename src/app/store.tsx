import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "../feature/todo/todo.tsx"

export const store = configureStore({
    reducer: {
        todos: TodoReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
