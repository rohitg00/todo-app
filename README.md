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
   git clone <repository-url>
   cd demo-bit/myws
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Install Bit components:
   ```bash
   bit install
   ```

### Development

1. Start the development server:
   ```bash
   bit start
   ```

2. Access the Bit dev server at http://localhost:3000

## 🛠️ Component Development

### Creating a New Component

```bash
bit create react-component ui/my-component
```

### Testing Components

```bash
bit test
```

### Building Components

```bash
bit build
```

### Tagging Components

```bash
bit tag --all
```

### Exporting Components

```bash
bit export
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

## 🤝 Contributing

1. Create a new component or modify an existing one
2. Tag your changes with a meaningful message
3. Export your components to the remote scope
4. Submit a PR with documentation of your changes

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details. 