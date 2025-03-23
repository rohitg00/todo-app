import { TodoItem } from './todo-item.js';

export const BasicTodoItem = () => {
  return (
    <TodoItem 
      id="1"
      text="Complete the task"
      priority="medium"
      tags={[{ id: "1", name: "Work", color: "#4a90e2" }]}
    />
  );
}
