import { NodeServer } from '@bitdev/node.node-server';

export default NodeServer.from({
  name: 'todo-server',
  mainPath: import.meta.resolve('./todo-server.app-root.js'),
});
