import { TodoItem, PlainTodoItem } from '@dras/todo-app.entities.todo-item';
import { v4 as uuidv4 } from 'uuid';

/**
 * todo server
 */
export class TodoServer {
  private todos: TodoItem[] = [];

  constructor() {
    // Initialize with some sample todos
    this.todos = [
      new TodoItem(uuidv4(), 'Learn Bit', false),
      new TodoItem(uuidv4(), 'Build a todo app', false),
      new TodoItem(uuidv4(), 'Share with the team', false)
    ];
  }

  /**
   * say hello.
   */
  async getHello() {
    return 'Hello from Todo Server!';
  }

  /**
   * get all todos
   */
  async getTodos(): Promise<TodoItem[]> {
    return this.todos;
  }

  /**
   * get a todo by id
   */
  async getTodoById(id: string): Promise<TodoItem | undefined> {
    return this.todos.find(todo => todo.id === id);
  }

  /**
   * create a new todo
   */
  async createTodo(text: string): Promise<TodoItem> {
    const newTodo = new TodoItem(uuidv4(), text, false);
    this.todos.push(newTodo);
    return newTodo;
  }

  /**
   * toggle a todo's completed status
   */
  async toggleTodo(id: string): Promise<TodoItem | undefined> {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) return undefined;
    
    const updatedTodo = this.todos[todoIndex].toggleComplete();
    this.todos[todoIndex] = updatedTodo;
    return updatedTodo;
  }

  /**
   * delete a todo
   */
  async deleteTodo(id: string): Promise<boolean> {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter(todo => todo.id !== id);
    return this.todos.length !== initialLength;
  }

  /**
   * create a new instance of a todo server.
   */
  static from() {
    return new TodoServer();
  }
}    
