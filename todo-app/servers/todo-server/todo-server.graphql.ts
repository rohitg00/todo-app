import { gql } from 'graphql-tag';
import { DocumentNode } from 'graphql';
import { GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper';
import { TodoServer } from './todo-server.js';

export type ServerSchema = {
  typeDefs: DocumentNode,
  resolvers: GraphQLResolverMap
}

export function todoServerSchema(todoServer: TodoServer): ServerSchema {
  const typeDefs = gql`#graphql
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
    createdAt: String!
  }

  type Query {
    hello: String
    todos: [Todo!]!
    todo(id: ID!): Todo
  }

  type Mutation {
    createTodo(text: String!): Todo!
    toggleTodo(id: ID!): Todo
    deleteTodo(id: ID!): Boolean!
  }
`;

  const resolvers = {
    Query: {
      hello: async () => {
        return todoServer.getHello();
      },
      todos: async () => {
        return todoServer.getTodos();
      },
      todo: async (_, { id }) => {
        return todoServer.getTodoById(id);
      }
    },
    Mutation: {
      createTodo: async (_, { text }) => {
        return todoServer.createTodo(text);
      },
      toggleTodo: async (_, { id }) => {
        return todoServer.toggleTodo(id);
      },
      deleteTodo: async (_, { id }) => {
        return todoServer.deleteTodo(id);
      }
    }
  };

  return {
    typeDefs,
    resolvers
  };
} 
