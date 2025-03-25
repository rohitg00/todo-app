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

export function TodoApp({ mock = false, serverUrl = "http://localhost:5001/graphql" }: TodoAppProps) {
  return (
    <Routes>
      <Route path="/" element={<TodoPage serverUrl={serverUrl} mock={mock} />} />
    </Routes>
  );
}