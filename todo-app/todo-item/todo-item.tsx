import React, { ReactNode } from 'react';

export type TodoItemProps = {
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

export function TodoItem({ text, completed, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="todo-item" style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
      <input 
        type="checkbox" 
        checked={completed} 
        onChange={onToggle} 
        style={{ marginRight: '8px' }}
      />
      <span style={{ 
        textDecoration: completed ? 'line-through' : 'none',
        flex: 1 
      }}>
        {text}
      </span>
      <button onClick={onDelete} style={{ marginLeft: '8px' }}>Delete</button>
    </div>
  );
}
