import { useState, CSSProperties } from 'react';
// Temporarily comment out the rich text editor import
// import { RichTextEditor } from '@dras/todo-app.ui.rich-text-editor';

export type TodoPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TodoTag = {
  id: string;
  name: string;
  color: string;
};

export type EnhancedTodoItemProps = {
  /**
   * Todo item ID
   */
  id: string;
  /**
   * Todo item title/text
   */
  text: string;
  /**
   * Todo completion status
   */
  completed?: boolean;
  /**
   * Rich text content
   */
  content?: string;
  /**
   * Due date
   */
  dueDate?: Date;
  /**
   * Priority level
   */
  priority?: TodoPriority;
  /**
   * Tags attached to the todo
   */
  tags?: TodoTag[];
  /**
   * Toggle completion callback
   */
  onToggle?: (id: string) => void;
  /**
   * Delete callback
   */
  onDelete?: (id: string) => void;
  /**
   * Update content callback
   */
  onContentChange?: (id: string, content: string) => void;
  /**
   * Update due date callback
   */
  onDueDateChange?: (id: string, date: Date | null) => void;
  /**
   * Update priority callback
   */
  onPriorityChange?: (id: string, priority: TodoPriority) => void;
  /**
   * Update tags callback
   */
  onTagsChange?: (id: string, tags: TodoTag[]) => void;
};

const styles: Record<string, CSSProperties> = {
  todoItem: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    marginBottom: '10px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  header: {
    padding: '12px 15px'
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center'
  },
  checkbox: {
    marginRight: '10px',
    width: '18px',
    height: '18px'
  },
  todoText: {
    flex: 1,
    fontSize: '16px'
  },
  actions: {
    display: 'flex',
    alignItems: 'center'
  },
  expandButton: {
    background: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    color: '#888',
    marginRight: '8px'
  },
  deleteButton: {
    background: 'none',
    fontSize: '20px',
    color: '#f44336',
    cursor: 'pointer',
    padding: '0 5px'
  },
  metaInfo: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '8px',
    flexWrap: 'wrap' as 'wrap'
  },
  priorityBadge: {
    fontSize: '12px',
    padding: '2px 8px',
    borderRadius: '10px',
    color: 'white',
    marginRight: '10px'
  },
  dueDate: {
    fontSize: '12px',
    color: '#666',
    marginRight: '10px'
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap'
  },
  tag: {
    fontSize: '12px',
    padding: '2px 8px',
    borderRadius: '10px',
    color: 'white',
    marginRight: '5px',
    marginBottom: '5px'
  },
  expandedContent: {
    padding: '0 15px 15px'
  },
  controls: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    marginBottom: '15px',
    gap: '15px'
  },
  controlGroup: {
    flex: '1 1 45%',
    minWidth: '150px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#666',
    fontSize: '14px'
  },
  select: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  dateInput: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  notes: {
    marginTop: '10px'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    resize: 'vertical' as 'vertical',
    fontFamily: 'inherit'
  }
};

export function EnhancedTodoItem({
  id,
  text,
  completed = false,
  content = '',
  dueDate,
  priority = 'medium',
  tags = [],
  onToggle,
  onDelete,
  onContentChange,
  onDueDateChange,
  onPriorityChange,
  onTagsChange
}: EnhancedTodoItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [noteContent, setNoteContent] = useState(content);
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setNoteContent(newContent);
    if (onContentChange) {
      onContentChange(id, newContent);
    }
  };
  
  const handleDueDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onDueDateChange) {
      const dateValue = event.target.value;
      onDueDateChange(id, dateValue ? new Date(dateValue) : null);
    }
  };
  
  const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onPriorityChange) {
      onPriorityChange(id, event.target.value as TodoPriority);
    }
  };
  
  const handleTagsChange = (newTags: TodoTag[]) => {
    if (onTagsChange) {
      onTagsChange(id, newTags);
    }
  };
  
  const priorityColors = {
    low: '#8bc34a',
    medium: '#ffc107',
    high: '#ff9800',
    urgent: '#f44336'
  };
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div style={styles.todoItem}>
      <div style={styles.header}>
        <div style={styles.titleRow}>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggle && onToggle(id)}
            style={styles.checkbox}
          />
          
          <span 
            style={{
              ...styles.todoText,
              textDecoration: completed ? 'line-through' : 'none',
              color: completed ? '#888' : 'inherit'
            }}
          >
            {text}
          </span>
          
          <div style={styles.actions}>
            <button 
              style={styles.expandButton}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? '▲' : '▼'}
            </button>
            
            <button 
              style={styles.deleteButton}
              onClick={() => onDelete && onDelete(id)}
            >
              ×
            </button>
          </div>
        </div>
        
        <div style={styles.metaInfo}>
          {priority && (
            <div 
              style={{
                ...styles.priorityBadge,
                backgroundColor: priorityColors[priority]
              }}
            >
              {priority}
            </div>
          )}
          
          {dueDate && (
            <div style={styles.dueDate}>
              {dueDate.toLocaleDateString()}
            </div>
          )}
          
          <div style={styles.tags}>
            {tags.map(tag => (
              <span 
                key={tag.id}
                style={{
                  ...styles.tag,
                  backgroundColor: tag.color
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {expanded && (
        <div style={styles.expandedContent}>
          <div style={styles.controls}>
            <div style={styles.controlGroup}>
              <label style={styles.label} htmlFor={`priority-${id}`}>Priority</label>
              <select 
                id={`priority-${id}`}
                value={priority}
                onChange={handlePriorityChange}
                style={styles.select}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            
            <div style={styles.controlGroup}>
              <label style={styles.label} htmlFor={`duedate-${id}`}>Due Date</label>
              <input 
                id={`duedate-${id}`}
                type="date"
                value={dueDate ? formatDate(dueDate) : ''}
                onChange={handleDueDateChange}
                style={styles.dateInput}
              />
            </div>
          </div>
          
          <div style={styles.notes}>
            <label style={styles.label} htmlFor={`notes-${id}`}>Notes</label>
            <textarea
              id={`notes-${id}`}
              value={noteContent}
              onChange={handleContentChange}
              style={styles.textarea}
              placeholder="Add notes..."
              rows={6}
            />
          </div>
        </div>
      )}
    </div>
  );
}
