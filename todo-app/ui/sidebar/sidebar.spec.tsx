import React from 'react';
import { render } from '@testing-library/react';
import { BasicSidebar } from './sidebar.composition.js';

it('should render the correct text', () => {
  const { getByText } = render(<BasicSidebar />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
