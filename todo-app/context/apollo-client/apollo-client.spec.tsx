import React from 'react';
import { render } from '@testing-library/react';
import { BasicApolloClient } from './apollo-client.composition.js';

it('should render the correct text', () => {
  const { getByText } = render(<BasicApolloClient />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
