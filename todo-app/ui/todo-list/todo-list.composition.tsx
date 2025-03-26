import { TodoItem } from '@dras/todo-app.entities.todo-item';
import { TodoList } from './todo-list.js';

// Basic todo list component for testing
export const BasicTodoList = () => {
  // Note: We no longer use initialTodos directly
  // Instead, we're relying on the Apollo mock provider in the actual component
  
  return (
    <TodoList />
  );
}
