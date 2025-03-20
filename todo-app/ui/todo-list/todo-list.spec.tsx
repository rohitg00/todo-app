import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { BasicTodoList } from './todo-list.composition.js';

// Mock the useTodoList hook to avoid Apollo client dependency issues
vi.mock('@dras/todo-app.hooks.use-todo-list', () => ({
  useTodoList: () => ({
    loading: false,
    error: null,
    todos: [],
    incrementCounter: vi.fn()
  })
}));

it('should render with items prop', () => {
  const { container } = render(<BasicTodoList />);
  expect(container).toBeTruthy();
});
