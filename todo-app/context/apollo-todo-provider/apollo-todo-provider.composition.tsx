import { ApolloTodoProvider } from './apollo-todo-provider.js';
import { TodoList } from '@dras/todo-app.ui.todo-list';

export const BasicApolloTodoProvider = () => {
  return (
    <ApolloTodoProvider mock={true}>
      <div>Mock provider active for previews!</div>
    </ApolloTodoProvider>
  );
}

export const ApolloTodoProviderWithTodoList = () => {
  return (
    <ApolloTodoProvider mock={true}>
      <TodoList />
    </ApolloTodoProvider>
  );
}
