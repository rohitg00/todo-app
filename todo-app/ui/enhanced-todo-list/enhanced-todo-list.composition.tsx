import { EnhancedTodoList } from './enhanced-todo-list.js';

export const BasicEnhancedTodoList = () => {
  return (
    <EnhancedTodoList 
      initialTodos={[
        {
          id: '1',
          text: 'Example todo item',
          completed: false,
          priority: 'medium'
        }
      ]}
    />
  );
}
