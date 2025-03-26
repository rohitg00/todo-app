import { EnhancedTodoItem } from './enhanced-todo-item.js';

export const BasicEnhancedTodoItem = () => {
  return (
    <EnhancedTodoItem 
      id="1"
      text="Complete the task"
      priority="medium"
      tags={[{ id: "1", name: "Work", color: "#4a90e2" }]}
    />
  );
}
