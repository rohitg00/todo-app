# Todo App

A modern, component-based Todo application built with Bit, React, and Apollo GraphQL.

## 🌟 Overview

This project demonstrates a modular approach to building web applications using Bit's component-driven architecture. It features a complete Todo application with a rich set of features including real-time state management, rich text editing, and a modern UI.

## 🧩 Component Architecture

The application is built with a component-driven architecture, where each component is independently versioned, tested, and deployed.

### Component Hierarchy

```
dras.todo-app/
├── context/
│   ├── apollo-client (v0.0.2) - Apollo GraphQL client configuration
│   └── apollo-todo-provider (v0.0.1) - Apollo context provider for todos
├── entities/
│   └── todo-item (v0.0.1) - Todo item data model
├── hooks/
│   └── use-todo-list (v0.0.4) - Custom hook for managing todo lists
├── pages/
│   └── todo-page (v0.0.11) - Main todo page layout
├── servers/
│   └── todo-server (v0.0.2) - GraphQL server implementation
├── todo-app (v0.0.11) - Main application component
├── todo-item (v0.0.1) - Basic todo item component
└── ui/
    ├── enhanced-todo-item (v0.0.5) - Enhanced todo item with additional features
    ├── enhanced-todo-list (v0.0.6) - Enhanced todo list component
    ├── rich-text-editor (v0.0.3) - Rich text editor for todo content
    ├── sidebar (v0.0.3) - Application sidebar
    └── todo-list (v0.0.7) - Basic todo list component
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- pnpm (preferred) or npm
- Bit CLI

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rohitg00/todo-app/
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Install Bit components:
   ```bash
   bit install
   ```

## 🛠️ Component Development

### Actual Commands Used in this Project

Below is the sequence of commands used to build this project:

#### Creating Components

```bash
# Creating core data models and services
bit create entity entities/todo-item
bit create graphql-server servers/todo-server
bit create react context/apollo-todo-provider
bit create react-hook hooks/use-todo-list

# Creating UI components
bit create react ui/todo-list
bit create react pages/todo-page
bit create react-app todo-app
bit create react ui/sidebar
bit create react ui/rich-text-editor
bit create react ui/enhanced-todo-item
bit create react ui/enhanced-todo-list
bit create react context/apollo-client
```

#### Installing Dependencies

```bash
bit install uuid @types/uuid
bit install @apollo/client
```

#### Running the Application

```bash
# Start the GraphQL server
bit run todo-server

# Start the React application
bit run todo-app
```

#### Building and Tagging Components

```bash
# Compile components
bit compile

# Tag components with versioning
bit tag --message "todo app"
```

#### Exporting Components

```bash
# Export components to a remote scope
bit export
```

#### Checking Component Status

```bash
# View status of components
bit status

# List all components
bit list

# Show component details
bit show dras.todo-app/ui/todo-list
bit show dras.todo-app/hooks/use-todo-list
bit show dras.todo-app/entities/todo-item
```

#### Building Components

```bash
# Build all components
bit build

# Build including unmodified components
bit build --unmodified
```

## 🔍 Key Features

- **Modular Architecture**: Each component is independently developed and versioned
- **GraphQL Integration**: Apollo Client for state management and data fetching
- **Rich Text Editing**: Advanced content editing capabilities
- **Component Composition**: Components that can be composed to build various UIs
- **TypeScript Support**: Type-safe development experience

## 📋 Component Details

### apollo-client
Apollo GraphQL client configuration for data fetching and state management.

### todo-page
Main page for the Todo application, rendering the todo list and providing UI for creating and managing todos.

### rich-text-editor
A powerful rich text editor component based on Draft.js, allowing for formatted content in todo items.

### todo-list
Displays a list of todo items with support for checking off completed items.

### use-todo-list
Custom React hook that provides todo list functionality to components.

## 🔄 Recent Updates

- Fixed TypeScript errors and composition files
- Updated Apollo Client implementation with proper .js extensions
- Enhanced component testing with Vitest integration
- Improved component rendering in composition files
- Added proper CSS support for styling components

## 📝 Development Guidelines

### Code Style
- Follow consistent coding patterns across components
- Keep components focused on a single responsibility
- Write comprehensive tests for each component

### Component Design
- Design components for reusability
- Use composition over inheritance
- Implement proper prop interfaces with TypeScript

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details. 