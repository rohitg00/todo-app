import React from 'react';
import { render } from '@testing-library/react';
import { BasicApolloTodoProvider } from './apollo-todo-provider.composition.js';

it('should render the correct text', () => {
  const { getByText } = render(<BasicApolloTodoProvider />);
  const rendered = getByText('Mock provider active for previews!');
  expect(rendered).toBeTruthy();
});
