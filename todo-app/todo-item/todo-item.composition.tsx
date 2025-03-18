import { TodoItem } from './todo-item.js';

export const BasicTodoItem = () => {
  return (
    <TodoItem 
      text="Learn Bit" 
      completed={false} 
      onToggle={() => console.log('Toggled!')} 
      onDelete={() => console.log('Deleted!')} 
    />
  );
};

export const CompletedTodoItem = () => {
  return (
    <TodoItem 
      text="Initialize Bit workspace" 
      completed={true} 
      onToggle={() => console.log('Toggled!')} 
      onDelete={() => console.log('Deleted!')} 
    />
  );
};
