import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteTodo, setTodo} from "./todosReducer";

export default function TodoItem({todo}: { todo: any }) {
    const dispatch = useDispatch();

    return (
        <li key={todo.id}
            className="list-group-item d-flex justify-content-end flex-row-reverse align-items-center gap-3">
            <button className="btn btn-danger " onClick={() => dispatch(deleteTodo(todo.id))}
                    id="wd-delete-todo-click"> Delete
            </button>
            <button className="btn btn-primary " onClick={() => dispatch(setTodo(todo))}
                    id="wd-set-todo-click"> Edit
            </button>
            {todo.title}
        </li>
    );
}

