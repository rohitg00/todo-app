import React, { ReactNode, useMemo, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { GET_TODOS, CREATE_TODO, UPDATE_TODO, DELETE_TODO } from '@dras/todo-app.hooks.use-todo-list';

export type ApolloTodoProviderProps = {
  /**
   * Flag to use mock data instead of a real GraphQL endpoint
   */
  mock?: boolean;
  /**
   * Children to render within the provider
   */
  children: ReactNode;
  /**
   * GraphQL server URL
   */
  serverUrl?: string;
};

// Initial mock data for todos
const initialMockTodos = [
  { id: '1', text: 'Learn GraphQL', completed: false, priority: 'high', __typename: 'Todo' },
  { id: '2', text: 'Build a todo app', completed: true, priority: 'high', __typename: 'Todo' },
  { id: '3', text: 'Learn React', completed: false, priority: 'low', __typename: 'Todo' },
];

/**
 * Apollo Provider for Todo App
 */
export function ApolloTodoProvider({ mock = false, children, serverUrl = 'http://localhost:4000/graphql' }: ApolloTodoProviderProps) {
  // State to track current mock data
  const [mockTodos, setMockTodos] = useState([...initialMockTodos]);
  
  // Create fresh mocks for each render
  const mocks = useMemo(() => [
    // Query to get all todos
    {
      request: {
        query: GET_TODOS,
      },
      result: () => {
        console.log('Mock GET_TODOS returning:', mockTodos);
        return {
          data: {
            todos: mockTodos,
          },
        };
      },
    },
    
    // Mock any CREATE_TODO mutation regardless of text
    {
      request: {
        query: CREATE_TODO,
      },
      result: ({ variables }: any) => {
        console.log("Mock CREATE_TODO called with:", variables);
        
        // Ensure we have text and priority
        const text = variables?.text || 'New Todo';
        const priority = variables?.priority || 'low';
        
        // Generate a unique ID
        const newId = `new-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        
        // Create the new todo
        const newTodo = {
          id: newId,
          text: text,
          completed: false,
          priority: priority,
          __typename: 'Todo',
        };
        
        console.log(`Creating todo: ${newId} - "${text}" (priority: ${priority})`);
        
        // Update our mock data
        setMockTodos(prev => [...prev, newTodo]);
        
        return {
          data: {
            createTodo: newTodo,
          },
        };
      },
    },
    
    // Mock any UPDATE_TODO mutation
    {
      request: {
        query: UPDATE_TODO,
      },
      result: ({ variables }: any) => {
        console.log("Mock UPDATE_TODO called with:", variables);
        
        // Find the todo in our mock todos
        const todoIndex = mockTodos.findIndex(t => t.id === variables?.id);
        const todo = todoIndex >= 0 ? mockTodos[todoIndex] : null;
        
        if (todo) {
          // Create updated todo
          const updatedTodo = {
            ...todo,
            completed: variables?.completed !== undefined ? variables.completed : todo.completed,
            priority: variables?.priority || todo.priority
          };
          
          // Update our mock data
          const newMockTodos = [...mockTodos];
          newMockTodos[todoIndex] = updatedTodo;
          setMockTodos(newMockTodos);
          
          console.log(`Updated todo ${todo.id}:`, updatedTodo);
          
          return {
            data: {
              updateTodo: updatedTodo,
            },
          };
        }
        
        return {
          data: {
            updateTodo: {
              id: variables?.id || 'unknown',
              text: 'Unknown Todo',
              completed: variables?.completed === undefined ? false : variables.completed,
              priority: variables?.priority || 'low',
              __typename: 'Todo',
            },
          },
        };
      },
    },
    
    // Mock any DELETE_TODO mutation
    {
      request: {
        query: DELETE_TODO,
      },
      result: ({ variables }: any) => {
        console.log("Mock DELETE_TODO called with:", variables);
        
        // Remove from our mock data
        setMockTodos(prev => prev.filter(todo => todo.id !== variables?.id));
        
        return {
          data: {
            deleteTodo: true,
          },
        };
      },
    },
  ], [mockTodos]);

  if (mock) {
    console.log('Using mock Apollo provider for Todo app');
    return (
      <MockedProvider 
        mocks={mocks} 
        addTypename={false}
        defaultOptions={{
          watchQuery: { fetchPolicy: 'cache-first' },
          query: { fetchPolicy: 'cache-first', errorPolicy: 'all' },
          mutate: { errorPolicy: 'all' }
        }}
      >
        {children}
      </MockedProvider>
    );
  }

  // For real implementation, create a client pointing to your GraphQL server
  const client = new ApolloClient({
    uri: serverUrl,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
} 