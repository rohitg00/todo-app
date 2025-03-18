import React from 'react';
import { render } from '@testing-library/react';
import { TodoItem } from './todo-item.js';

it('should render the todo text correctly', () => {
  const { getByText } = render(
    <TodoItem 
      text="Learn Bit" 
      completed={false} 
      onToggle={() => {}} 
      onDelete={() => {}} 
    />
  );
  const todoText = getByText('Learn Bit');
  expect(todoText).toBeTruthy();
});
