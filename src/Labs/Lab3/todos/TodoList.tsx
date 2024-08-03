import TodoItem from "./TodoItem";
import todos from "./todos.json";
const TodoList = () => {
  return (
    <>
    <hr />
      <h3>Todo List</h3>
      <ul className="list-group">
        {todos.map((todo) => {
          return <TodoItem todo={todo} />;
        })}
      </ul>
      <hr />
    </>
  );
};
export default TodoList;
