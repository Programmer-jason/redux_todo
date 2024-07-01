import { useDispatch } from "react-redux"
import { removeTodo } from "../feature/todo/todo.tsx";
import { MdDelete } from "react-icons/md";

type idType = {
    todoId: number
}

const RemoveTodo = ({ todoId }: idType) => {
    const dispatch = useDispatch();

    return (
        <section>
            <div onClick={() => {
                dispatch(removeTodo({ id: todoId }))
                console.log('clicked')
            }}>

                <MdDelete />
            </div>
        </section>
    )
}

export default RemoveTodo