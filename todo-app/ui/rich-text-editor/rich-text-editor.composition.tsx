import { useState } from 'react';
import { RichTextEditor } from './rich-text-editor.js';

export const BasicRichTextEditor = () => {
  const [content, setContent] = useState('');
  
  return (
    <RichTextEditor 
      initialContent='{"blocks":[{"key":"b1fo9","text":"Sample content","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
      onChange={setContent}
      placeholder="Write your notes here..."
    />
  );
}
