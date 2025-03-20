import { TodoItem } from '@dras/todo-app.entities.todo-item';
import { TodoList } from './todo-list.js';

export const BasicTodoList = () => {
  const mockItems = [
    new TodoItem('1', 'Complete the task', false),
    new TodoItem('2', 'Review the PR', true)
  ];
  
  return (
    <TodoList items={mockItems} />
  );
}
