import { ReactNode, createContext, useContext } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';

export type ApolloTodoProviderProps = {
  /**
   * sets the component children.
   */
  children?: ReactNode;
  /**
   * GraphQL server URL
   */
  serverUrl?: string;
};

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
  serverUrl = 'http://localhost:5001/graphql' 
}: ApolloTodoProviderProps) {
  const client = createApolloClient(serverUrl);

  return (
    <ApolloClientContext.Provider value={client}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </ApolloClientContext.Provider>
  );
}
