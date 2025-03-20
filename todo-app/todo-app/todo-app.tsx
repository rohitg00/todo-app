import { Routes, Route } from 'react-router-dom';
import { TodoPage } from '@dras/todo-app.pages.todo-page';

export function TodoApp() {
  return (
    <Routes>
      <Route path="/" element={<TodoPage serverUrl="http://localhost:5001/graphql" />} />
    </Routes>
  );
}