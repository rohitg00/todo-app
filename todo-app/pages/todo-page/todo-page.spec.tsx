import React from 'react';
import { render } from '@testing-library/react';
import { BasicTodoPage } from './todo-page.composition.js';

it('should render with serverUrl prop', () => {
  const { container } = render(<BasicTodoPage />);
  expect(container).toBeTruthy();
});
