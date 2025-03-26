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
    refetch: vi.fn().mockResolvedValue({}),
    createTodo: vi.fn(),
    toggleTodo: vi.fn(),
    deleteTodo: vi.fn(),
    updatePriority: vi.fn()
  })
}));

it('should render with proper UI', () => {
  const { container } = render(<BasicTodoList />);
  expect(container).toBeTruthy();
});
