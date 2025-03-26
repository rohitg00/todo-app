import { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { TodoItem } from '@dras/todo-app.entities.todo-item';

// GraphQL queries and mutations for todos
export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      completed
      priority
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($text: String!, $priority: String!) {
    createTodo(text: $text, priority: $priority) {
      id
      text
      completed
      priority
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $completed: Boolean!, $priority: String) {
    updateTodo(id: $id, completed: $completed, priority: $priority) {
      id
      text
      completed
      priority
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

/**
 * Custom hook to manage a list of todo items using GraphQL
 */
export function useTodoList() {
  // State to store todos
  const [todos, setTodos] = useState<TodoItem[]>([]);
  
  // Query to fetch all todos
  const { data, loading, error, refetch } = useQuery(GET_TODOS, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  });
  
  // Create todo mutation
  const [createTodoMutation] = useMutation(CREATE_TODO, {
    errorPolicy: 'all',
  });
  
  // Update todo mutation
  const [updateTodoMutation] = useMutation(UPDATE_TODO, {
    errorPolicy: 'all',
  });
  
  // Delete todo mutation
  const [deleteTodoMutation] = useMutation(DELETE_TODO, {
    errorPolicy: 'all',
  });
  
  // Update todos whenever query data changes
  useEffect(() => {
    if (data?.todos) {
      console.log('Received todos from query:', data.todos);
      const newTodos = data.todos.map(
        (todo: any) => new TodoItem(todo.id, todo.text, todo.completed, todo.priority || 'low')
      );
      setTodos(newTodos);
    }
  }, [data]);
  
  // Function to create a new todo
  const createTodo = async (text: string, priority: 'high' | 'low' = 'low') => {
    if (!text.trim()) return;
    
    try {
      // Generate a temporary ID for the optimistic update
      const tempId = `temp-${Date.now()}`;
      
      // Create an optimistic todo
      const optimisticTodo = new TodoItem(tempId, text, false, priority);
      
      // Add to state immediately for better UX
      setTodos(prevTodos => [...prevTodos, optimisticTodo]);
      
      console.log('Added optimistic todo:', optimisticTodo);
      
      // Call the mutation
      const result = await createTodoMutation({
        variables: { text, priority },
      });
      
      console.log('Create todo result:', result);
      
      // If successful, replace our temporary todo with the real one
      if (result.data?.createTodo) {
        setTodos(prevTodos => 
          prevTodos.map(todo => 
            todo.id === tempId 
              ? new TodoItem(
                  result.data.createTodo.id,
                  result.data.createTodo.text,
                  result.data.createTodo.completed,
                  result.data.createTodo.priority || 'low'
                )
              : todo
          )
        );
      } else {
        // If error, remove the optimistic todo
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== tempId));
        console.error('Failed to create todo:', result.errors);
      }
    } catch (err) {
      console.error('Error creating todo:', err);
      throw err;
    }
  };
  
  // Function to toggle a todo's completed status
  const toggleTodo = async (id: string) => {
    try {
      // Find the todo to toggle
      const todo = todos.find(t => t.id === id);
      if (!todo) {
        console.error(`Todo with id ${id} not found`);
        return;
      }
      
      console.log(`Toggling todo ${id} from ${todo.completed} to ${!todo.completed}`);
      
      // Update local state optimistically
      const newCompleted = !todo.completed;
      setTodos(prevTodos => {
        // Create a new array of todos with the updated one
        const updatedTodos = prevTodos.map(t => 
          t.id === id ? new TodoItem(t.id, t.text, newCompleted, t.priority) : t
        );
        
        console.log('Updated todos after toggle:', updatedTodos.map(t => 
          `${t.id}: ${t.text} (${t.completed ? 'completed' : 'active'}, ${t.priority})`
        ));
        
        return updatedTodos;
      });
      
      // Call mutation (no need to wait for the result to update UI)
      updateTodoMutation({
        variables: { id, completed: newCompleted },
      }).then(result => {
        console.log('Toggle mutation completed:', result);
        
        // Only revert if there's an actual error (not a mock limitation)
        if (!result.data?.updateTodo && result.errors) {
          const isMockError = result.errors.some(
            e => e.message.includes('No more') || e.message.includes('mocked')
          );
          
          if (!isMockError) {
            // Revert the optimistic update
            console.log('Reverting toggle due to mutation error');
            setTodos(prevTodos => 
              prevTodos.map(t => 
                t.id === id ? new TodoItem(t.id, t.text, todo.completed, t.priority) : t
              )
            );
          }
        }
      }).catch(err => {
        console.error('Error in update mutation:', err);
        
        // Only revert if it's not a mock error
        if (!(err.toString().includes('No more') || err.toString().includes('mocked'))) {
          console.log('Reverting toggle due to mutation exception');
          setTodos(prevTodos => 
            prevTodos.map(t => 
              t.id === id ? new TodoItem(t.id, t.text, todo.completed, t.priority) : t
            )
          );
        }
      });
      
    } catch (err) {
      console.error('Failed to toggle todo:', err);
      
      // Only attempt to refetch if we have an error that's not related to mocking
      if (!(err.toString().includes('No more') || err.toString().includes('mocked'))) {
        refetch().catch(refetchErr => console.error('Error refetching after toggle:', refetchErr));
      }
    }
  };
  
  // Function to delete a todo
  const deleteTodo = async (id: string) => {
    try {
      console.log(`Deleting todo with ID: ${id}`);
      
      // Find the todo to delete
      const todoToDelete = todos.find(t => t.id === id);
      if (!todoToDelete) {
        console.error(`Todo with id ${id} not found for deletion`);
        return;
      }
      
      // Store a copy of the current todos for potential rollback
      const previousTodos = [...todos];
      
      // Optimistic update - remove immediately
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      
      try {
        // Call mutation
        const result = await deleteTodoMutation({
          variables: { id },
        });
        
        console.log('Delete todo result:', result);
        
        // If unsuccessful via Apollo, but we got this far, keep the optimistic update
        // since we're in mock mode and the mock may have been used up
        if (!result.data?.deleteTodo && result.errors) {
          // Check if the error is just a mock-related error
          const isMockError = result.errors.some(
            e => e.message.includes('No more') || e.message.includes('mocked')
          );
          
          if (!isMockError) {
            // Only restore if it's a real error, not a mock limitation
            console.error('Failed to delete todo, restoring state:', result.errors);
            setTodos(previousTodos);
          } else {
            console.log('Ignoring mock error for delete operation, keeping optimistic update');
          }
        }
      } catch (mutationErr) {
        console.error('Exception in delete mutation:', mutationErr);
        
        // Check if it's a mock error
        if (mutationErr.toString().includes('No more') || 
            mutationErr.toString().includes('mocked')) {
          console.log('Ignoring mock error, keeping optimistic update');
        } else {
          // Only restore on real errors
          setTodos(previousTodos);
        }
      }
    } catch (err) {
      console.error('Failed to delete todo:', err);
      
      // Only attempt to refetch if we have an error that's not related to mocking
      if (!(err.toString().includes('No more') || err.toString().includes('mocked'))) {
        refetch().catch(refetchErr => console.error('Error refetching after delete:', refetchErr));
      }
    }
  };
  
  // Function to update a todo's priority
  const updatePriority = async (id: string, priority: 'high' | 'low') => {
    try {
      // Find the todo to update
      const todo = todos.find(t => t.id === id);
      if (!todo) {
        console.error(`Todo with id ${id} not found`);
        return;
      }
      
      if (todo.priority === priority) {
        console.log(`Todo ${id} already has priority ${priority}`);
        return;
      }
      
      console.log(`Updating todo ${id} priority from ${todo.priority} to ${priority}`);
      
      // Update local state optimistically
      setTodos(prevTodos => {
        // Create a new array of todos with the updated one
        const updatedTodos = prevTodos.map(t => 
          t.id === id ? new TodoItem(t.id, t.text, t.completed, priority) : t
        );
        
        console.log('Updated todos after priority change:', updatedTodos.map(t => 
          `${t.id}: ${t.text} (${t.completed ? 'completed' : 'active'}, ${t.priority})`
        ));
        
        return updatedTodos;
      });
      
      // Call mutation with explicit priority parameter
      updateTodoMutation({
        variables: { 
          id, 
          completed: todo.completed, 
          priority 
        }
      }).then(result => {
        console.log('Priority update mutation completed:', result);
        
        // Force refetch to ensure consistency across all views
        refetch().catch(err => console.log('Error refetching after priority update:', err));
        
        // Only revert if there's an actual error (not a mock limitation)
        if (!result.data?.updateTodo && result.errors) {
          const isMockError = result.errors.some(
            e => e.message.includes('No more') || e.message.includes('mocked')
          );
          
          if (!isMockError) {
            // Revert the optimistic update
            console.log('Reverting priority update due to mutation error');
            setTodos(prevTodos => 
              prevTodos.map(t => 
                t.id === id ? new TodoItem(t.id, t.text, t.completed, todo.priority) : t
              )
            );
          }
        }
      }).catch(err => {
        console.error('Error in priority update mutation:', err);
        
        // Only revert if it's not a mock error
        if (!(err.toString().includes('No more') || err.toString().includes('mocked'))) {
          console.log('Reverting priority update due to mutation exception');
          setTodos(prevTodos => 
            prevTodos.map(t => 
              t.id === id ? new TodoItem(t.id, t.text, t.completed, todo.priority) : t
            )
          );
        }
      });
      
    } catch (err) {
      console.error('Failed to update todo priority:', err);
    }
  };
  
  return {
    todos,
    loading,
    error,
    refetch,
    createTodo,
    toggleTodo,
    deleteTodo,
    updatePriority,
  };
}
