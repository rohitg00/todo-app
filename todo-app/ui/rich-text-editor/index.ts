// Import polyfill first to ensure it runs before draft-js
import './polyfill.js';
import './rich-text-editor.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export { RichTextEditor } from './rich-text-editor.js';
export type { RichTextEditorProps } from './rich-text-editor.js';
