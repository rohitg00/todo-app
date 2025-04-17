import { TodoPage } from './todo-page.js';

export const BasicTodoPage = () => {
  return (
    <TodoPage serverUrl="http://localhost:5001/graphql" mock={true} />
  );
}

export const TodoPageSimpleMode = () => {
  return (
    <TodoPage serverUrl="http://localhost:5001/graphql" mock={true} />
  );
}
