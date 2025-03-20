import { useState, useEffect } from 'react';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export type RichTextEditorProps = {
  /**
   * Initial content as a JSON string
   */
  initialContent?: string;
  /**
   * Callback when content changes
   */
  onChange?: (content: string) => void;
  /**
   * Height of the editor
   */
  height?: number;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Read-only mode
   */
  readOnly?: boolean;
  /**
   * Toolbar options
   */
  toolbarHidden?: boolean;
};

export function RichTextEditor({
  initialContent,
  onChange,
  height = 200,
  placeholder = 'Write something...',
  readOnly = false,
  toolbarHidden = false
}: RichTextEditorProps) {
  const [editorState, setEditorState] = useState(() => {
    if (initialContent) {
      try {
        const contentState = convertFromRaw(JSON.parse(initialContent));
        return EditorState.createWithContent(contentState);
      } catch (e) {
        console.error('Error parsing initial content', e);
      }
    }
    return EditorState.createEmpty();
  });

  useEffect(() => {
    if (initialContent && !editorState.getCurrentContent().hasText()) {
      try {
        const contentState = convertFromRaw(JSON.parse(initialContent));
        setEditorState(EditorState.createWithContent(contentState));
      } catch (e) {
        console.error('Error parsing initial content', e);
      }
    }
  }, [initialContent]);

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    
    if (onChange) {
      const contentState = state.getCurrentContent();
      const rawContent = convertToRaw(contentState);
      onChange(JSON.stringify(rawContent));
    }
  };

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '4px',
      minHeight: `${height}px`,
      backgroundColor: 'white'
    }}>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'emoji'],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough'],
          },
          blockType: {
            options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote', 'Code'],
          },
          textAlign: {
            options: ['left', 'center', 'right'],
          },
        }}
        toolbarHidden={toolbarHidden}
        readOnly={readOnly}
        placeholder={placeholder}
        editorStyle={{
          padding: '0 15px',
          minHeight: `${height - 40}px`,
          maxHeight: '500px',
          overflow: 'auto'
        }}
      />
    </div>
  );
}
