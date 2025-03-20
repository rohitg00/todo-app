import { TodoServer } from './todo-server.js';

describe('todo server', () => {
  it('should say hello', async () => {
    const todoServer = TodoServer.from();
    const greeting = await todoServer.getHello();
    expect(greeting).toEqual('Hello from Todo Server!');
  })
});
    