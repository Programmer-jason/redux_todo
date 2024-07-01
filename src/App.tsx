import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import AddTodo from "./components/AddTodo";
import RemoveTodo from "./components/RemoveTodo";
import { useEffect } from "react";
import { fetchData } from "./feature/todo/todo";

function App() {

    const getTodos = useSelector((state: RootState) => state.todos.data);
    // GET DATA FROM REDUXSTORE
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchData() as any);
    }, [])


    return (
        <main className="h-screen bg-gray-100 overflow-auto">
            <h1 className="text-gray-800 p-4 bg-gradient-to-r from-orange-300 from to-green-400 font-bold">REACT REDUX TODO</h1>
            <hr />
            <br />
            <AddTodo />
            <ul className="flex justify-center flex-wrap gap-2 mt-5">
                {
                    getTodos.map((values) => (
                        <li className="w-[300px] h-46 rounded-md  border border-gray-400" key={values.id}>
                            <div className="text-nowrap flex justify-between items-center p-3 bg-gradient-to-r from-orange-300 from to-green-400 font-bold text-gray-800">
                                <h1>Id: {values.id}</h1>
                                <RemoveTodo todoId={values.id} />
                            </div>
                            <div className="p-3">{values.todos}</div>
                        </li>
                    ))
                }
            </ul>
        </main>
    )
}

export default App
