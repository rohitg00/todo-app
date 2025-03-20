import React from 'react';
import { render } from '@testing-library/react';
import { BasicEnhancedTodoList } from './enhanced-todo-list.composition.js';

it('should render the correct text', () => {
  const { getByText } = render(<BasicEnhancedTodoList />);
  const rendered = getByText('Example todo item');
  expect(rendered).toBeTruthy();
});
