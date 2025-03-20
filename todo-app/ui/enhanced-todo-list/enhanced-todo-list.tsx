import { useState, useEffect, CSSProperties } from 'react';
import { EnhancedTodoItem, TodoPriority, TodoTag } from '@dras/todo-app.ui.enhanced-todo-item';
import { v4 as uuidv4 } from 'uuid';

export type EnhancedTodo = {
  id: string;
  text: string;
  completed: boolean;
  content?: string;
  dueDate?: Date;
  priority?: TodoPriority;
  tags?: TodoTag[];
};

export type EnhancedTodoListProps = {
  /**
   * Initial todos
   */
  initialTodos?: EnhancedTodo[];
  /**
   * Available tags
   */
  availableTags?: TodoTag[];
  /**
   * Unique ID for this list to save/retrieve from localStorage
   */
  listId?: string;
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px 0'
  },
  header: {
    marginBottom: '20px'
  },
  addForm: {
    display: 'flex',
    gap: '10px'
  },
  input: {
    flex: 1,
    padding: '10px 15px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    outline: 'none'
  },
  addButton: {
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  filters: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px'
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '5px'
  },
  filterLabel: {
    marginRight: '10px',
    fontSize: '14px',
    fontWeight: 'bold' as const
  },
  filterButton: {
    padding: '6px 12px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  activeFilter: {
    backgroundColor: '#e0e0e0',
    borderColor: '#bbb'
  },
  tagSection: {
    marginBottom: '20px',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  tagHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  tagTitle: {
    margin: 0,
    fontSize: '16px'
  },
  addTagButton: {
    backgroundColor: 'transparent',
    border: '1px solid #0070f3',
    color: '#0070f3',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  createTag: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    gap: '10px'
  },
  tagInput: {
    flex: 1,
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  colorPicker: {
    width: '40px',
    height: '30px',
    padding: '0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  saveTagButton: {
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  tagList: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px'
  },
  tagButton: {
    padding: '6px 12px',
    border: '1px solid #ddd',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  activeTagFilter: {
    borderWidth: '2px',
    backgroundColor: 'transparent'
  },
  todoList: {
    marginTop: '20px'
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    color: '#666'
  }
};

export function EnhancedTodoList({ 
  initialTodos = [],
  availableTags = [],
  listId = 'default-todos'
}: EnhancedTodoListProps) {
  const [todos, setTodos] = useState<EnhancedTodo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [tags, setTags] = useState<TodoTag[]>(availableTags.length > 0 ? availableTags : [
    { id: 'work', name: 'Work', color: '#2196f3' },
    { id: 'personal', name: 'Personal', color: '#9c27b0' },
    { id: 'urgent', name: 'Urgent', color: '#f44336' },
    { id: 'idea', name: 'Idea', color: '#4caf50' }
  ]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<TodoPriority | null>(null);
  const [isCreatingTag, setIsCreatingTag] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#2196f3');

  // Load todos from localStorage or use initialTodos
  useEffect(() => {
    const savedTodos = localStorage.getItem(`todos-${listId}`);
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (e) {
        console.error('Error parsing saved todos', e);
        setTodos(initialTodos);
      }
    } else {
      setTodos(initialTodos);
    }
    
    const savedTags = localStorage.getItem(`tags-${listId}`);
    if (savedTags) {
      try {
        const parsedTags = JSON.parse(savedTags);
        if (parsedTags.length > 0) {
          setTags(parsedTags);
        }
      } catch (e) {
        console.error('Error parsing saved tags', e);
      }
    }
  }, [initialTodos, listId]);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem(`todos-${listId}`, JSON.stringify(todos));
    }
  }, [todos, listId]);

  // Save tags to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`tags-${listId}`, JSON.stringify(tags));
  }, [tags, listId]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim() !== '') {
      const newTodo: EnhancedTodo = {
        id: uuidv4(),
        text: newTodoText,
        completed: false,
        priority: 'medium'
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setNewTodoText('');
      
      // Save to localStorage
      localStorage.setItem(`todos-${listId}`, JSON.stringify(updatedTodos));
    }
  };

  const handleToggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    
    // Save to localStorage
    localStorage.setItem(`todos-${listId}`, JSON.stringify(updatedTodos));
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    
    // Save to localStorage
    localStorage.setItem(`todos-${listId}`, JSON.stringify(updatedTodos));
  };

  const handleContentChange = (id: string, content: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, content } : todo
    );
    setTodos(updatedTodos);
    
    // Save to localStorage
    localStorage.setItem(`todos-${listId}`, JSON.stringify(updatedTodos));
  };

  const handleDueDateChange = (id: string, date: Date | null) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, dueDate: date || undefined } : todo
    );
    setTodos(updatedTodos);
    
    // Save to localStorage
    localStorage.setItem(`todos-${listId}`, JSON.stringify(updatedTodos));
  };

  const handlePriorityChange = (id: string, priority: TodoPriority) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, priority } : todo
    );
    setTodos(updatedTodos);
    
    // Save to localStorage
    localStorage.setItem(`todos-${listId}`, JSON.stringify(updatedTodos));
  };

  const handleTagsChange = (id: string, todoTags: TodoTag[]) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, tags: todoTags } : todo
    );
    setTodos(updatedTodos);
    
    // Save to localStorage
    localStorage.setItem(`todos-${listId}`, JSON.stringify(updatedTodos));
  };

  const handleAddTag = () => {
    if (newTagName.trim() !== '') {
      const newTag: TodoTag = {
        id: uuidv4(),
        name: newTagName,
        color: newTagColor
      };
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      setNewTagName('');
      setNewTagColor('#2196f3');
      setIsCreatingTag(false);
      
      // Save to localStorage
      localStorage.setItem(`tags-${listId}`, JSON.stringify(updatedTags));
    }
  };

  const filteredTodos = todos.filter(todo => {
    // Filter by completion status
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;
    
    // Filter by tag
    if (tagFilter && (!todo.tags || !todo.tags.some(tag => tag.id === tagFilter))) {
      return false;
    }
    
    // Filter by priority
    if (priorityFilter && todo.priority !== priorityFilter) {
      return false;
    }
    
    return true;
  });

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <form onSubmit={handleAddTodo} style={styles.addForm}>
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Add a new todo..."
            style={styles.input}
          />
          <button type="submit" style={styles.addButton}>
            Add Todo
          </button>
        </form>
      </div>
      
      <div style={styles.filters}>
        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>Status:</span>
          <button 
            style={{
              ...styles.filterButton,
              ...(filter === 'all' ? styles.activeFilter : {})
            }}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(filter === 'active' ? styles.activeFilter : {})
            }}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(filter === 'completed' ? styles.activeFilter : {})
            }}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        
        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>Priority:</span>
          <button 
            style={{
              ...styles.filterButton,
              ...(priorityFilter === null ? styles.activeFilter : {})
            }}
            onClick={() => setPriorityFilter(null)}
          >
            All
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(priorityFilter === 'low' ? styles.activeFilter : {}),
              backgroundColor: priorityFilter === 'low' ? '#8bc34a' : undefined,
              color: priorityFilter === 'low' ? 'white' : undefined
            }}
            onClick={() => setPriorityFilter('low')}
          >
            Low
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(priorityFilter === 'medium' ? styles.activeFilter : {}),
              backgroundColor: priorityFilter === 'medium' ? '#ffc107' : undefined,
              color: priorityFilter === 'medium' ? 'white' : undefined
            }}
            onClick={() => setPriorityFilter('medium')}
          >
            Medium
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(priorityFilter === 'high' ? styles.activeFilter : {}),
              backgroundColor: priorityFilter === 'high' ? '#ff9800' : undefined,
              color: priorityFilter === 'high' ? 'white' : undefined
            }}
            onClick={() => setPriorityFilter('high')}
          >
            High
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(priorityFilter === 'urgent' ? styles.activeFilter : {}),
              backgroundColor: priorityFilter === 'urgent' ? '#f44336' : undefined,
              color: priorityFilter === 'urgent' ? 'white' : undefined
            }}
            onClick={() => setPriorityFilter('urgent')}
          >
            Urgent
          </button>
        </div>
      </div>
      
      <div style={styles.tagSection}>
        <div style={styles.tagHeader}>
          <h3 style={styles.tagTitle}>Tags</h3>
          <button 
            style={styles.addTagButton}
            onClick={() => setIsCreatingTag(!isCreatingTag)}
          >
            {isCreatingTag ? 'Cancel' : '+ New Tag'}
          </button>
        </div>
        
        {isCreatingTag && (
          <div style={styles.createTag}>
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="Tag name"
              style={styles.tagInput}
            />
            <input
              type="color"
              value={newTagColor}
              onChange={(e) => setNewTagColor(e.target.value)}
              style={styles.colorPicker}
            />
            <button 
              onClick={handleAddTag}
              style={styles.saveTagButton}
            >
              Save
            </button>
          </div>
        )}
        
        <div style={styles.tagList}>
          <button 
            style={{
              ...styles.tagButton,
              ...(tagFilter === null ? styles.activeTagFilter : {})
            }}
            onClick={() => setTagFilter(null)}
          >
            All
          </button>
          
          {tags.map(tag => (
            <button 
              key={tag.id}
              style={{
                ...styles.tagButton,
                ...(tagFilter === tag.id ? styles.activeTagFilter : {}),
                backgroundColor: tagFilter === tag.id ? tag.color : undefined,
                color: tagFilter === tag.id ? 'white' : undefined,
                borderColor: tag.color
              }}
              onClick={() => setTagFilter(tag.id === tagFilter ? null : tag.id)}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
      
      <div style={styles.todoList}>
        {filteredTodos.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No todos match your filters</p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <EnhancedTodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              content={todo.content}
              dueDate={todo.dueDate}
              priority={todo.priority}
              tags={todo.tags}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onContentChange={handleContentChange}
              onDueDateChange={handleDueDateChange}
              onPriorityChange={handlePriorityChange}
              onTagsChange={handleTagsChange}
            />
          ))
        )}
      </div>
    </div>
  );
}
