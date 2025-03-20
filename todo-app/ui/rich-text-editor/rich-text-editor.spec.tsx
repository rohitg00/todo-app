import React from 'react';
import { render } from '@testing-library/react';
import { BasicRichTextEditor } from './rich-text-editor.composition.js';

it('should render rich text editor', () => {
  const { container } = render(<BasicRichTextEditor />);
  const editorWrapper = container.querySelector('.rdw-editor-wrapper');
  expect(editorWrapper).toBeTruthy();
});
