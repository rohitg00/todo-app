import type { ReactNode } from 'react';
import { ApolloClient as Client, InMemoryCache } from '@apollo/client';

export type ApolloClientComponentProps = {
  /**
   * sets the component children.
   */
  children?: ReactNode;
};

export function ApolloClientComponent({ children }: ApolloClientComponentProps) {
  return (
    <div>
      {children}
    </div>
  );
}

// Create the Apollo client
export const client = new Client({
  uri: 'http://localhost:5001/graphql', // Default server URL
  cache: new InMemoryCache()
});

// Function to create a client with a custom URL
export const createClient = (serverUrl: string) => {
  return new Client({
    uri: serverUrl,
    cache: new InMemoryCache()
  });
};
