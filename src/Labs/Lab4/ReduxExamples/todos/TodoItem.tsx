import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

interface Todo {
  id: number;
  title: string;
}

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();
  return (
    <li key={todo.id} className="list-group-item">
      <button
        className="btn btn-primary me-2"
        onClick={() => dispatch(setTodo(todo))}
        id="wd-set-todo-click"
      >
        Edit
      </button>
      <button
        className="btn btn-danger"
        onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click"
      >
        Delete
      </button>
      {todo.title}
    </li>
  );
}
