// export default function TodoItem({ todo, deleteTodo, setTodo }: {
//     todo: { id: string; title: string };
//     deleteTodo: (id: string) => void;
//     setTodo: (todo: { id: string; title: string }) => void;
// }) {
//     return (
//         <li key={todo.id} className="list-group-item">
//             <button onClick={() => deleteTodo(todo.id)}
//                 id="wd-delete-todo-click" className="btn btn-danger mx-1 float-end"> Delete </button>
//             <button onClick={() => setTodo(todo)}
//                 id="wd-set-todo-click" className="btn btn-primary mx-1 float-end"> Edit </button>
//             {todo?.title}
//         </li>
//     );
// }

// Using REDUCER

import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: { id: string; title: string }; }) {
    const dispatch = useDispatch();
    return (
        <li key={todo.id} className="list-group-item">
            <button onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click" className="btn btn-danger mx-1 float-end"> Delete </button>
            <button onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click" className="btn btn-primary mx-1 float-end"> Edit </button>
            {todo?.title}
        </li>
    );
}
