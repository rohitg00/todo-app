import { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { TodoItem } from '@dras/todo-app.entities.todo-item';

// GraphQL queries and mutations
const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      completed
      createdAt
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($text: String!) {
    createTodo(text: $text) {
      id
      text
      completed
      createdAt
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      text
      completed
      createdAt
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export type TodoListHook = {
  todos: TodoItem[];
  loading: boolean;
  error: any;
  createTodo: (text: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  count: number;
  increment: () => void;
};

/**
 * A useTodoList React hook for managing todo items.
 */
export function useTodoList(): TodoListHook {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [count, setCount] = useState(0);
  
  // Query todos
  const { loading, error, data, refetch } = useQuery(GET_TODOS, {
    fetchPolicy: 'network-only'
  });
  
  // Mutations
  const [createTodoMutation] = useMutation(CREATE_TODO);
  const [toggleTodoMutation] = useMutation(TOGGLE_TODO);
  const [deleteTodoMutation] = useMutation(DELETE_TODO);
  
  // Update todos when data changes
  useEffect(() => {
    if (data?.todos) {
      setTodos(data.todos.map((todo: any) => 
        new TodoItem(todo.id, todo.text, todo.completed, todo.createdAt)
      ));
    }
  }, [data]);
  
  // Create a new todo
  const createTodo = async (text: string) => {
    try {
      await createTodoMutation({ variables: { text } });
      refetch();
    } catch (err) {
      console.error('Error creating todo:', err);
    }
  };
  
  // Toggle a todo's completed status
  const toggleTodo = async (id: string) => {
    try {
      await toggleTodoMutation({ variables: { id } });
      refetch();
    } catch (err) {
      console.error('Error toggling todo:', err);
    }
  };
  
  // Delete a todo
  const deleteTodo = async (id: string) => {
    try {
      await deleteTodoMutation({ variables: { id } });
      refetch();
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };
  
  // Increment counter
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };
  
  return {
    todos,
    loading,
    error,
    createTodo,
    toggleTodo,
    deleteTodo,
    count,
    increment
  };
}
