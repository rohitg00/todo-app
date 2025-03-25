// TodoList component for simple todo management
import { useState, useEffect, CSSProperties } from 'react';
import { TodoItem as TodoItemType } from '@dras/todo-app.entities.todo-item';
import { useTodoList } from '@dras/todo-app.hooks.use-todo-list';
import { TodoItem, TodoPriority, TodoTag } from '@dras/todo-app.ui.todo-item';
import { v4 as uuidv4 } from 'uuid';

// Enhanced Todo type extending the basic TodoItem
export type EnhancedTodo = TodoItemType & {
  content?: string;
  dueDate?: Date;
  priority?: TodoPriority;
  tags?: TodoTag[];
};

// Define styles as a JavaScript object
const styles: Record<string, CSSProperties> = {
  todoList: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'sans-serif'
  },
  heading: {
    textAlign: 'center' as const,
    color: '#333',
    marginBottom: '20px'
  },
  todoForm: {
    display: 'flex',
    marginBottom: '20px'
  },
  todoInput: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px 0 0 4px',
    fontSize: '16px'
  },
  todoButton: {
    padding: '10px 15px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
    fontSize: '16px'
  },
  todos: {
    listStyle: 'none',
    padding: 0
  },
  emptyMessage: {
    textAlign: 'center' as const,
    color: '#888',
    marginTop: '20px'
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
  }
};

export type TodoListProps = {
  /**
   * Optional custom todo items
   */
  items?: EnhancedTodo[];
  /**
   * Function to create a new todo
   */
  onCreateTodo?: (text: string) => Promise<void>;
  /**
   * Function to toggle a todo's completed status
   */
  onToggleTodo?: (id: string) => Promise<void>;
  /**
   * Function to delete a todo
   */
  onDeleteTodo?: (id: string) => Promise<void>;
  /**
   * Function to update a todo's content
   */
  onContentChange?: (id: string, content: string) => void;
  /**
   * Function to update a todo's due date
   */
  onDueDateChange?: (id: string, date: Date | null) => void;
  /**
   * Function to update a todo's priority
   */
  onPriorityChange?: (id: string, priority: TodoPriority) => void;
  /**
   * Function to update a todo's tags
   */
  onTagsChange?: (id: string, tags: TodoTag[]) => void;
  /**
   * Available tags for the todos
   */
  availableTags?: TodoTag[];
  /**
   * Unique ID for this list to save/retrieve from localStorage
   */
  listId?: string;
  /**
   * Whether to use enhanced features (filters, tags, etc.)
   */
  enhanced?: boolean;
};

export function TodoList({ 
  items,
  onCreateTodo,
  onToggleTodo,
  onDeleteTodo,
  onContentChange,
  onDueDateChange,
  onPriorityChange,
  onTagsChange,
  availableTags = [],
  listId = 'default-todos',
  enhanced = true
}: TodoListProps) {
  const hookResult = useTodoList();
  const [newTodoText, setNewTodoText] = useState('');
  const [todos, setTodos] = useState<EnhancedTodo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<TodoPriority | null>(null);
  const [tags, setTags] = useState<TodoTag[]>(
    availableTags.length > 0 ? availableTags : [
      { id: 'work', name: 'Work', color: '#2196f3' },
      { id: 'personal', name: 'Personal', color: '#9c27b0' },
      { id: 'urgent', name: 'Urgent', color: '#f44336' },
      { id: 'idea', name: 'Idea', color: '#4caf50' }
    ]
  );
  
  // Handle items from props or local storage
  useEffect(() => {
    if (items && items.length > 0) {
      setTodos(items);
    } else {
      const savedTodos = localStorage.getItem(`todos-${listId}`);
      if (savedTodos) {
        try {
          setTodos(JSON.parse(savedTodos));
        } catch (e) {
          console.error('Error parsing saved todos', e);
          setTodos([]);
        }
      }
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
  }, [items, listId]);
  
  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (!items && todos.length > 0) {
      localStorage.setItem(`todos-${listId}`, JSON.stringify(todos));
    }
  }, [todos, listId, items]);
  
  // Basic CRUD operations
  const createTodo = async (text: string) => {
    if (onCreateTodo) {
      await onCreateTodo(text);
    } else if (hookResult.createTodo && !items) {
      await hookResult.createTodo(text);
    } else {
      const newTodo: EnhancedTodo = {
        id: uuidv4(),
        text,
        completed: false,
        priority: 'medium',
        tags: []
      };
      setTodos([...todos, newTodo]);
    }
  };

  const toggleTodo = async (id: string) => {
    if (onToggleTodo) {
      await onToggleTodo(id);
    } else if (hookResult.toggleTodo && !items) {
      await hookResult.toggleTodo(id);
    } else {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    }
  };

  const deleteTodo = async (id: string) => {
    if (onDeleteTodo) {
      await onDeleteTodo(id);
    } else if (hookResult.deleteTodo && !items) {
      await hookResult.deleteTodo(id);
    } else {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  // Enhanced operations for content, due date, priority, and tags
  const handleContentChange = (id: string, content: string) => {
    if (onContentChange) {
      onContentChange(id, content);
    } else {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, content } : todo
      ));
    }
  };

  const handleDueDateChange = (id: string, date: Date | null) => {
    if (onDueDateChange) {
      onDueDateChange(id, date);
    } else {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, dueDate: date || undefined } : todo
      ));
    }
  };

  const handlePriorityChange = (id: string, priority: TodoPriority) => {
    if (onPriorityChange) {
      onPriorityChange(id, priority);
    } else {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, priority } : todo
      ));
    }
  };

  const handleTagsChange = (id: string, todoTags: TodoTag[]) => {
    if (onTagsChange) {
      onTagsChange(id, todoTags);
    } else {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, tags: todoTags } : todo
      ));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      await createTodo(newTodoText);
      setNewTodoText('');
    }
  };
  
  // Filter todos based on selected filters
  const filteredTodos = todos.filter(todo => {
    // Filter by completion status
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;
    
    // Filter by tag
    if (tagFilter && (!todo.tags || !todo.tags.some(tag => tag.id === tagFilter))) return false;
    
    // Filter by priority
    if (priorityFilter && todo.priority !== priorityFilter) return false;
    
    return true;
  });
  
  // Loading and error states
  const loading = !items && hookResult.loading;
  const error = !items && hookResult.error;
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading todos!</div>;
  
  // Simple mode rendering
  if (!enhanced) {
    return (
      <div style={styles.todoList}>
        <h2 style={styles.heading}>Todo List</h2>
        
        <form onSubmit={handleSubmit} style={styles.todoForm}>
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Add a new todo"
            style={styles.todoInput}
          />
          <button type="submit" style={styles.todoButton}>Add</button>
        </form>
        
        <ul style={styles.todos}>
          {todos.map((todo) => (
            <li key={todo.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              borderBottom: '1px solid #eee'
            }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '12px' }}
              />
              <span style={{
                flex: 1,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#888' : 'inherit'
              }}>{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  backgroundColor: '#ff4d4f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '5px 10px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        
        {todos.length === 0 && (
          <p style={styles.emptyMessage}>No todos yet! Add one above.</p>
        )}
      </div>
    );
  }
  
  // Enhanced mode rendering
  return (
    <div style={styles.todoList}>
      <h2 style={styles.heading}>Todo List</h2>
      
      <form onSubmit={handleSubmit} style={styles.todoForm}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo"
          style={styles.todoInput}
        />
        <button type="submit" style={styles.todoButton}>Add</button>
      </form>
      
      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>Status:</span>
          {(['all', 'active', 'completed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterButton,
                ...(filter === f ? styles.activeFilter : {})
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Priority filter */}
        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>Priority:</span>
          <button
            onClick={() => setPriorityFilter(null)}
            style={{
              ...styles.filterButton,
              ...(priorityFilter === null ? styles.activeFilter : {})
            }}
          >
            All
          </button>
          {(['low', 'medium', 'high', 'urgent'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              style={{
                ...styles.filterButton,
                ...(priorityFilter === p ? styles.activeFilter : {})
              }}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Tag filter */}
        <div style={styles.tagSection}>
          <div style={styles.tagHeader}>
            <h3 style={styles.tagTitle}>Filter by Tag</h3>
          </div>
          
          <div style={styles.tagList}>
            <button
              onClick={() => setTagFilter(null)}
              style={{
                ...styles.tagButton,
                ...(tagFilter === null ? styles.activeTagFilter : {})
              }}
            >
              All
            </button>
            {tags.map(tag => (
              <button
                key={tag.id}
                onClick={() => setTagFilter(tag.id)}
                style={{
                  ...styles.tagButton,
                  backgroundColor: tagFilter === tag.id ? 'transparent' : tag.color,
                  color: tagFilter === tag.id ? '#333' : 'white',
                  borderColor: tag.color,
                  ...(tagFilter === tag.id ? styles.activeTagFilter : {})
                }}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Todo Items list */}
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          content={todo.content}
          dueDate={todo.dueDate}
          priority={todo.priority}
          tags={todo.tags}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onContentChange={handleContentChange}
          onDueDateChange={handleDueDateChange}
          onPriorityChange={handlePriorityChange}
          onTagsChange={handleTagsChange}
        />
      ))}
      
      {filteredTodos.length === 0 && (
        <p style={styles.emptyMessage}>
          {todos.length === 0 
            ? 'No todos yet! Add one above.' 
            : 'No todos match your current filters.'}
        </p>
      )}
    </div>
  );
}
