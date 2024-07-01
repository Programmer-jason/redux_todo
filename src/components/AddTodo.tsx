import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../feature/todo/todo";
import axios from 'axios';


const AddTodo = () => {
    const dispatch = useDispatch()
    const [input, setInput] = useState<string>('');

    function submit(e: any) {
        e.preventDefault();
        axios.post('http://localhost:3000/create', {
            id: null, todos: input,
        }).then((response) => {
            dispatch(addTodo({ id: response.data.data.insertId, todos: input }))
            // console.log(response.data.data.insertId)
        })
            .catch((e) => {
                console.log(e)
            })
        setInput('');
    }

    return (
        <section>
            <form onSubmit={submit} className="ml-28">
                <input type="text" onChange={(e) => setInput(() => e.target.value)} value={input} className="p-2 bg-orange-200" />
                <input type="submit" value="CREATE" className="p-2 bg-orange-300 font-bold text-gray-800" />
            </form>
        </section >
    )
}

export default memo(AddTodo);