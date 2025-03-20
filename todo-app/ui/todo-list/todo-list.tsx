// TodoList component for simple todo management
import { useState, CSSProperties } from 'react';
import { TodoItem } from '@dras/todo-app.entities.todo-item';
import { useTodoList } from '@dras/todo-app.hooks.use-todo-list';

// Define styles as a JavaScript object
const styles: Record<string, CSSProperties> = {
  todoList: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'sans-serif'
  },
  heading: {
    textAlign: 'center' as const,
    color: '#333'
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
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderBottom: '1px solid #eee'
  },
  completedItem: {},
  todoCheckbox: {
    marginRight: '12px'
  },
  todoText: {
    flex: 1
  },
  completedText: {
    textDecoration: 'line-through',
    color: '#888'
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer'
  },
  emptyMessage: {
    textAlign: 'center' as const,
    color: '#888',
    marginTop: '20px'
  }
};

export type TodoListProps = {
  /**
   * Optional custom todo items
   */
  items?: TodoItem[];
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
};

export function TodoList({ 
  items,
  onCreateTodo,
  onToggleTodo,
  onDeleteTodo
}: TodoListProps) {
  const hookResult = useTodoList();
  const [newTodoText, setNewTodoText] = useState('');
  
  // Use provided props or hook values
  const todos = items || hookResult.todos;
  const createTodo = onCreateTodo || hookResult.createTodo;
  const toggleTodo = onToggleTodo || hookResult.toggleTodo;
  const deleteTodo = onDeleteTodo || hookResult.deleteTodo;
  const loading = !items && hookResult.loading;
  const error = !items && hookResult.error;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      await createTodo(newTodoText);
      setNewTodoText('');
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading todos!</div>;
  
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
            ...styles.todoItem,
            ...(todo.completed ? styles.completedItem : {})
          }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={styles.todoCheckbox}
            />
            <span style={{
              ...styles.todoText,
              ...(todo.completed ? styles.completedText : {})
            }}>{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={styles.deleteButton}
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
