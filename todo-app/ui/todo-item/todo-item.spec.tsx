import React from 'react';
import { render } from '@testing-library/react';
import { BasicTodoItem } from './todo-item.composition.js';

it('should render the correct text', () => {
  const { getByText } = render(<BasicTodoItem />);
  const rendered = getByText('Complete the task');
  expect(rendered).toBeTruthy();
});
