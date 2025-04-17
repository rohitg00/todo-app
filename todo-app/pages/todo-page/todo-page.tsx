import { ApolloTodoProvider } from '@dras/todo-app.context.apollo-todo-provider';
import { TodoList } from '@dras/todo-app.ui.todo-list';
import { Sidebar, Page } from '@dras/todo-app.ui.sidebar';
import { useState, CSSProperties } from 'react';
import { TodoTag } from '@dras/todo-app.ui.todo-item';

// Define styles as a JavaScript object
const styles: Record<string, CSSProperties> = {
  todoPage: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    fontFamily: 'sans-serif',
    overflow: 'hidden'
  },
  appContainer: {
    display: 'flex',
    height: '100%',
    width: '100%'
  },
  contentArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden'
  },
  header: {
    backgroundColor: '#0070f3',
    color: 'white',
    padding: '20px',
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center'
  },
  heading: {
    margin: 0,
    fontSize: '24px'
  },
  main: {
    flex: 1,
    padding: '20px',
    overflow: 'auto'
  },
  footer: {
    backgroundColor: '#f5f5f5',
    padding: '10px',
    textAlign: 'center' as const,
    borderTop: '1px solid #eaeaea',
    color: '#666'
  }
};

type PageView = 'all' | 'active' | 'completed' | 'priority-high' | 'priority-low';

export type TodoPageProps = {
  /**
   * GraphQL server URL
   */
  serverUrl?: string;
  /**
   * Use mock data instead of actual GraphQL server
   */
  mock?: boolean;
};

/**
 * TodoPage component - the main page of the Todo application
 */
export function TodoPage({ serverUrl, mock = true }: TodoPageProps) {
  const [currentView, setCurrentView] = useState<PageView>('all');
  const [availableTags] = useState<TodoTag[]>([
    { id: 'work', name: 'Work', color: '#2196f3' },
    { id: 'personal', name: 'Personal', color: '#9c27b0' },
    { id: 'urgent', name: 'Urgent', color: '#f44336' },
    { id: 'idea', name: 'Idea', color: '#4caf50' }
  ]);
  
  const getPageTitle = (view: PageView) => {
    switch(view) {
      case 'active': return 'Active Todos';
      case 'completed': return 'Completed Todos';
      case 'priority-high': return 'High Priority Todos';
      case 'priority-low': return 'Low Priority Todos';
      default: return 'All Todos';
    }
  };
  
  return (
    <ApolloTodoProvider serverUrl={serverUrl} mock={mock}>
      <div style={styles.todoPage}>
        <div style={styles.appContainer}>
          <Sidebar
            pages={[
              { id: 'all', title: 'All Todos', type: 'todo' },
              { id: 'active', title: 'Active', type: 'todo' },
              { id: 'completed', title: 'Completed', type: 'todo' },
              { id: 'priority-high', title: 'High Priority', type: 'todo' },
              { id: 'priority-low', title: 'Low Priority', type: 'todo' }
            ]}
            activePage={currentView}
            onPageSelect={(pageId) => setCurrentView(pageId as PageView)}
          />
          
          <div style={styles.contentArea}>
            <header style={styles.header}>
              <h1 style={styles.heading}>{getPageTitle(currentView)}</h1>
            </header>
            
            <main style={styles.main}>
              <TodoList className="todo-page-list" filter={currentView} />
            </main>
            
            <footer style={styles.footer}>
              Todo App - Built with Bit
            </footer>
          </div>
        </div>
      </div>
    </ApolloTodoProvider>
  );
}
