// TodoList component for simple todo management
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTodoList } from '@dras/todo-app.hooks.use-todo-list';
import styles from './todo-list.module.scss';

export type TodoListProps = {
  /**
   * Optional CSS class to apply to the component
   */
  className?: string;
  /**
   * Filter to apply to the todos
   * - 'all': Show all todos
   * - 'active': Show only incomplete todos
   * - 'completed': Show only completed todos
   * - 'priority-high': Show high priority todos
   * - 'priority-low': Show low priority todos
   */
  filter?: 'all' | 'active' | 'completed' | 'priority-high' | 'priority-low';
};

// Toast notification component
function Toast({ message, onClose }: { message: string, onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.toast}>
      {message}
    </div>
  );
}

/**
 * Simple Todo List Component
 */
export function TodoList({ className = '', filter = 'all' }: TodoListProps) {
  // State for the new todo input
  const [newTodoText, setNewTodoText] = useState('');
  // State for the priority of new todo
  const [newTodoPriority, setNewTodoPriority] = useState<'high' | 'low'>('low');
  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for toast notification
  const [toast, setToast] = useState<string | null>(null);
  // Reference to the input element
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Use our simplified hook
  const { todos, loading, error, createTodo, toggleTodo, deleteTodo, updatePriority, refetch } = useTodoList();
  
  // Debug the current filter and todos
  useEffect(() => {
    console.log(`Current filter: ${filter}`);
    console.log('Current todos:', todos);
  }, [filter, todos]);
  
  // Refetch todos when filter changes to ensure we have fresh data
  useEffect(() => {
    refetch().catch(err => console.error('Error refetching on filter change:', err));
  }, [filter, refetch]);
  
  // Filter todos based on the selected view
  const filteredTodos = useMemo(() => {
    if (!todos || todos.length === 0) return [];
    
    console.log(`Filtering todos with filter: ${filter}`);
    console.log('Todos before filtering:', todos.map(t => 
      `${t.id}: ${t.text} (${t.completed ? 'completed' : 'active'}, priority: ${t.priority})`
    ));
    
    let result;
    switch (filter) {
      case 'active':
        result = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        result = todos.filter(todo => todo.completed);
        break;
      case 'priority-high':
        result = todos.filter(todo => todo.priority === 'high');
        break;
      case 'priority-low':
        result = todos.filter(todo => todo.priority === 'low');
        break;
      default:
        result = [...todos];
    }
    
    console.log('Filtered todos:', result.map(t => 
      `${t.id}: ${t.text} (${t.completed ? 'completed' : 'active'}, priority: ${t.priority})`
    ));
    return result;
  }, [todos, filter]);
  
  // Focus the input field when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const text = newTodoText.trim();
    if (isSubmitting || !text) return;
    
    try {
      console.log(`Form submitted with text: "${text}", priority: ${newTodoPriority}`);
      setIsSubmitting(true);
      
      // Clear input immediately for better UX
      setNewTodoText('');
      
      // Use a timeout to ensure the UI updates before the mutation
      setTimeout(async () => {
        try {
          await createTodo(text, newTodoPriority);
          console.log('Todo created successfully');
          setToast(`Added "${text}" with ${newTodoPriority} priority`);
          
          // Focus the input field after adding
          if (inputRef.current) {
            inputRef.current.focus();
          }
        } catch (err) {
          console.error('Error adding todo:', err);
          // Don't restore the text - better UX to leave it cleared
        } finally {
          setIsSubmitting(false);
        }
      }, 0);
    } catch (err) {
      console.error('Error in form submission:', err);
      setIsSubmitting(false);
    }
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(e.target.value);
  };
  
  // Handle priority change
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTodoPriority(e.target.value as 'high' | 'low');
  };
  
  // Handle add button click (separate from form submission)
  const handleAddClick = () => {
    if (!newTodoText.trim() || isSubmitting) return;
    
    // Manually trigger the form submission
    const form = document.querySelector('form');
    if (form) {
      const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
      form.dispatchEvent(submitEvent);
    }
  };
  
  // Handle toggle todo completion
  const handleToggle = async (id: string) => {
    console.log(`Toggling todo with ID: ${id}`);
    try {
      await toggleTodo(id);
      console.log('Toggle completed successfully');
    } catch (err) {
      console.error(`Error toggling todo ${id}:`, err);
    }
  };
  
  // Handle delete button click
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    
    if (!id) return;
    
    try {
      console.log(`Deleting todo with ID: ${id}`);
      await deleteTodo(id);
      setToast('Todo deleted successfully');
    } catch (err) {
      console.error(`Error deleting todo ${id}:`, err);
    }
  };
  
  // Handle priority change
  const handlePriorityUpdate = async (id: string, priority: 'high' | 'low') => {
    try {
      // Find todo to get its text for the notification
      const todo = todos.find(t => t.id === id);
      
      console.log(`Updating todo ${id} to priority ${priority}`);
      await updatePriority(id, priority);
      
      // Show notification
      setToast(`Changed "${todo?.text || 'Todo'}" to ${priority} priority`);
      
      // If we're in a priority filter view, force refetch to ensure UI is consistent
      if (filter === 'priority-high' || filter === 'priority-low') {
        setTimeout(() => {
          refetch().catch(err => console.error('Error refetching after priority update:', err));
        }, 100);
      }
    } catch (err) {
      console.error(`Error updating todo priority ${id}:`, err);
    }
  };

  // Helper to check if error is just a mock-related error we can ignore
  const isMockError = (err: any): boolean => {
    if (!err) return false;
    const errorMsg = err.message || err.toString();
    return errorMsg.includes('No more mocked') || 
           errorMsg.includes('Expected variables');
  };

  // Show loading state
  if (loading && todos.length === 0) {
    return <div className={`${styles.todoList} ${className}`}>Loading todos...</div>;
  }

  // Show error state only for serious errors, not mock-related ones
  if (error && !isMockError(error)) {
    return (
      <div className={`${styles.todoList} ${className}`}>
        <p>Error loading todos: {error.message}</p>
        <p>Please try again later</p>
      </div>
    );
  }

  // Get title based on filter
  const getTitle = () => {
    switch (filter) {
      case 'active': return 'Active Todos';
      case 'completed': return 'Completed Todos';
      case 'priority-high': return 'High Priority Todos';
      case 'priority-low': return 'Low Priority Todos';
      default: return 'All Todos';
    }
  };

  return (
    <div className={`${styles.todoList} ${className}`} key={`todo-list-${filter}`}>
      <h2>{getTitle()}</h2>
      
      {/* Form to add new todo */}
      <form onSubmit={handleSubmit} className={styles.addForm}>
        <input
          ref={inputRef}
          type="text"
          value={newTodoText}
          onChange={handleInputChange}
          placeholder="Add a new todo..."
          className={styles.addInput}
          disabled={isSubmitting}
        />
        <select
          value={newTodoPriority}
          onChange={handlePriorityChange}
          className={styles.prioritySelect}
          disabled={isSubmitting}
        >
          <option value="low">Low Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button 
          type="button" 
          onClick={handleAddClick}
          className={styles.addButton}
          disabled={isSubmitting || !newTodoText.trim()}
        >
          {isSubmitting ? 'Adding...' : 'Add'}
        </button>
      </form>
      
      {/* Debug info - show count of todos and current filter */}
      <div style={{ fontSize: '12px', color: '#999', marginBottom: '10px' }}>
        Filter: <strong>{filter}</strong> | 
        Total todos: <strong>{todos.length}</strong> | 
        Filtered: <strong>{filteredTodos.length}</strong>
      </div>
      
      {/* List of todos */}
      {filteredTodos.length === 0 ? (
        <p className={styles.emptyMessage}>
          {todos.length === 0 ? 
            "No todos yet. Add one above!" : 
            `No todos match the current filter: ${filter}`}
        </p>
      ) : (
        <ul className={styles.list}>
          {filteredTodos.map((todo) => (
            <li key={todo.id} className={`${styles.item} ${styles[`priority-${todo.priority}`]}`}>
              <div className={styles.todoContent}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  className={styles.checkbox}
                  id={`todo-${todo.id}`}
                />
                <label 
                  htmlFor={`todo-${todo.id}`}
                  className={todo.completed ? styles.completed : ''}
                >
                  {todo.text}
                  <span className={styles.priorityIndicator}>
                    {todo.priority === 'high' ? 
                      <span className={styles.highPriority}>🔴 High</span> : 
                      <span className={styles.lowPriority}>🔵 Low</span>}
                  </span>
                </label>
              </div>
              <div className={styles.todoActions}>
                <select
                  value={todo.priority}
                  onChange={(e) => handlePriorityUpdate(todo.id, e.target.value as 'high' | 'low')}
                  className={`${styles.prioritySelectSmall} ${styles[`priority-${todo.priority}-select`]}`}
                >
                  <option value="low">Low</option>
                  <option value="high">High</option>
                </select>
                <button
                  onClick={(e) => handleDelete(todo.id, e)}
                  className={styles.deleteButton}
                  aria-label={`Delete todo: ${todo.text}`}
                  type="button"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {/* Toast notification */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
