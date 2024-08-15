// import { useState } from "react";
// import TodoForm from "./TodoForm";
// import TodoItem from "./TodoItem";
// export default function TodoList() {
//     const [todos, setTodos] = useState([
//         { id: "1", title: "Learn React" },
//         { id: "2", title: "Learn Node" }]);
//     const [todo, setTodo] = useState({ id: "-1", title: "Learn Mongo" });
//     const addTodo = (todo: any) => {
//         const newTodos = [...todos, {
//             ...todo,
//             id: new Date().getTime().toString()
//         }];
//         setTodos(newTodos);
//         setTodo({ id: "-1", title: "" });
//     };
//     const deleteTodo = (id: string) => {
//         const newTodos = todos.filter((todo) => todo.id !== id);
//         setTodos(newTodos);
//     };
//     const updateTodo = (todo: any) => {
//         const newTodos = todos?.map((item) =>
//             (item.id === todo.id ? todo : item));
//         setTodos(newTodos);
//         setTodo({ id: "-1", title: "" });
//     };
//     return (

                                //VERSION 2: Using State ONLY//


//         // <div>
//         //     <h2>Todo List</h2>
//         //     <ul className="list-group w-50">
//         //         <li className="list-group-item">
//         //             <button onClick={() => addTodo(todo)}
//         //                 id="wd-add-todo-click" className="btn btn-success mx-1 float-end">Add</button>
//         //             <button onClick={() => updateTodo(todo)}
//         //                 id="wd-update-todo-click" className="btn btn-warning mx-1 float-end">
//         //                 Update </button>
//         //             <input value={todo?.title} className="form-control mx-1 float-start w-50"
//         //                 onChange={(e) =>
//         //                     setTodo({
//         //                         ...todo,
//         //                         title: e.target.value
//         //                     })
//         //                 }
//         //             />
//         //         </li>
//         //         {todos?.map((todo) => (
//         //             <li key={todo.id} className="list-group-item">
//         //                 <button onClick={() => deleteTodo(todo.id)}
//         //                     id="wd-delete-todo-click" className="btn btn-danger mx-1 float-end">
//         //                     Delete </button>
//         //                 <button onClick={() => setTodo(todo)}
//         //                     id="wd-set-todo-click" className="btn btn-primary mx-1 float-end">
//         //                     Edit </button>
//         //                 {todo?.title}
//         //             </li>
//         //         ))}
//         //     </ul>
//         //     <hr />
//         // </div>

                                //VERSION 2: Using State and Components//

//         <div id="wd-todo-list-redux" className="w-50">
//             <h2>Todo List</h2>
//             <ul className="list-group">
//                 <TodoForm
//                     todo={todo}
//                     setTodo={setTodo}
//                     addTodo={addTodo}
//                     updateTodo={updateTodo} />
//                 {todos?.map((todo) => (
//                     <TodoItem
//                         todo={todo}
//                         deleteTodo={deleteTodo}
//                         setTodo={setTodo} />
//                 ))}
//             </ul>
//             <hr />
//         </div>
//     );
// }

import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

export default function TodoList() {
    const { todos } = useSelector((state: any) => state.todosReducer);
    return (
        <>
            <div id="wd-todo-list-redux" className="w-50">
                <h2>Todo List</h2>
                <ul className="list-group">
                    <TodoForm />
                    {todos?.map((todo: any) => (
                        <TodoItem todo={todo} />
                    ))}
                </ul>
            </div>
            <hr />
        </>
    );
}
