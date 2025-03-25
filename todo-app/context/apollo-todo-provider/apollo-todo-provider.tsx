import { ReactNode, createContext, useContext } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { GET_TODOS, CREATE_TODO, UPDATE_TODO, DELETE_TODO } from '@dras/todo-app.hooks.use-todo-list';
import { TodoItem } from '@dras/todo-app.entities.todo-item';

export type ApolloTodoProviderProps = {
  /**
   * sets the component children.
   */
  children?: ReactNode;
  /**
   * GraphQL server URL
   */
  serverUrl?: string;
  /**
   * Use mock data instead of actual GraphQL server
   */
  mock?: boolean;
  /**
   * Mock data to use when mock is true
   */
  mockData?: TodoItem[];
};

// Default mock data for previews
const defaultMockData: TodoItem[] = [
  { id: 'mock-1', text: 'Learn Bit', completed: false },
  { id: 'mock-2', text: 'Build components', completed: true },
  { id: 'mock-3', text: 'Share components', completed: false }
];

// Create Apollo client
export function createApolloClient(serverUrl = 'http://localhost:5001/graphql') {
  return new ApolloClient({
    link: new HttpLink({
      uri: serverUrl,
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
      },
    },
  });
}

export const ApolloClientContext = createContext<ApolloClient<any> | undefined>(undefined);

export function useApolloClient() {
  const context = useContext(ApolloClientContext);
  if (!context) {
    throw new Error('useApolloClient must be used within an ApolloTodoProvider');
  }
  return context;
}

export function ApolloTodoProvider({ 
  children, 
  serverUrl = 'http://localhost:5001/graphql',
  mock = false,
  mockData = defaultMockData 
}: ApolloTodoProviderProps) {
  // Create mocks for the Apollo MockedProvider
  const mocks = [
    {
      request: {
        query: GET_TODOS
      },
      result: {
        data: {
          todos: mockData
        }
      }
    },
    {
      request: {
        query: CREATE_TODO,
        variables: { text: 'New todo item' }
      },
      result: {
        data: {
          createTodo: { id: 'new-id', text: 'New todo item', completed: false }
        }
      }
    },
    // Additional mock handlers for other operations can be added here
  ];

  if (mock) {
    return (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );
  }
  
  const client = createApolloClient(serverUrl);

  return (
    <ApolloClientContext.Provider value={client}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </ApolloClientContext.Provider>
  );
}
