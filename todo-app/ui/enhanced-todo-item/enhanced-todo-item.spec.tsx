import React from 'react';
import { render } from '@testing-library/react';
import { BasicEnhancedTodoItem } from './enhanced-todo-item.composition.js';

it('should render the correct text', () => {
  const { getByText } = render(<BasicEnhancedTodoItem />);
  const rendered = getByText('Complete the task');
  expect(rendered).toBeTruthy();
});
