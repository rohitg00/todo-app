import { Routes, Route } from 'react-router-dom';
import { TodoPage } from '@dras/todo-app.pages.todo-page';

export type TodoAppProps = {
  /**
   * Use mock data for previews
   */
  mock?: boolean;
  /**
   * GraphQL server URL
   */
  serverUrl?: string;
};

export function TodoApp({ mock = true, serverUrl = "http://localhost:5001/graphql" }: TodoAppProps) {
  // Force mock to true for Netlify deployment
  const useMock = true;
  
  return (
    <Routes>
      <Route path="/" element={<TodoPage serverUrl={serverUrl} mock={useMock} />} />
    </Routes>
  );
}

// The existing TodoApp already has the mock prop set to false by default
// We can modify it to default to true for better preview support