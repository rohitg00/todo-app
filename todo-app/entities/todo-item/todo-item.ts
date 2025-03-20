export type PlainTodoItem = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export class TodoItem {
  constructor(
    /**
     * unique identifier for the todo item
     */
    readonly id: string,
    /**
     * text content of the todo item
     */
    readonly text: string,
    /**
     * whether the todo item is completed
     */
    readonly completed: boolean = false,
    /**
     * when the todo item was created
     */
    readonly createdAt: string = new Date().toISOString()
  ) {}

  /**
   * serialize a TodoItem into
   * a serializable object.
   */
  toObject(): PlainTodoItem {
    return {
      id: this.id,
      text: this.text,
      completed: this.completed,
      createdAt: this.createdAt
    };
  }

  /**
   * create a TodoItem object from a 
   * plain object.
   */
  static from(plainTodoItem: PlainTodoItem): TodoItem {
    return new TodoItem(
      plainTodoItem.id,
      plainTodoItem.text,
      plainTodoItem.completed,
      plainTodoItem.createdAt
    );
  }

  /**
   * creates a new TodoItem with the completed status toggled
   */
  toggleComplete(): TodoItem {
    return new TodoItem(
      this.id,
      this.text,
      !this.completed,
      this.createdAt
    );
  }
}
