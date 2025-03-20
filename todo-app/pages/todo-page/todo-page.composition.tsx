import { TodoPage } from './todo-page.js';

export const BasicTodoPage = () => {
  return (
    <TodoPage serverUrl="http://localhost:5001/graphql" />
  );
}
