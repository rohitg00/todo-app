import { MemoryRouter } from 'react-router-dom';
import { TodoApp } from "./todo-app.js";
    
export const TodoAppBasic = () => {
  return (
    <MemoryRouter>
      <TodoApp mock={true} />
    </MemoryRouter>
  );
}