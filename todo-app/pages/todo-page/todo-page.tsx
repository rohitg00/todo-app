import { ApolloTodoProvider } from '@dras/todo-app.context.apollo-todo-provider';
import { TodoList } from '@dras/todo-app.ui.todo-list';
import { EnhancedTodoList, EnhancedTodo } from '@dras/todo-app.ui.enhanced-todo-list';
import { Sidebar } from '@dras/todo-app.ui.sidebar';
import { useState, useMemo, CSSProperties } from 'react';
import { ApolloProvider } from '@apollo/client';

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
  },
  sidebarContent: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%'
  },
  sidebarTitle: {
    color: '#333',
    margin: '0 0 20px 0',
    fontSize: '20px'
  },
  navLinks: {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
    marginTop: '20px'
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    margin: '2px 0',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: '#333',
    fontSize: '14px',
    textAlign: 'left' as const,
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  activeNavLink: {
    backgroundColor: 'rgba(0, 112, 243, 0.1)',
    color: '#0070f3',
    fontWeight: 'bold'
  },
  navIcon: {
    marginRight: '10px',
    fontSize: '16px'
  },
  newPageButton: {
    padding: '8px 15px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s'
  },
  viewToggle: {
    display: 'flex',
    marginTop: '20px',
    borderTop: '1px solid #eaeaea',
    paddingTop: '20px'
  },
  toggleButton: {
    flex: 1,
    padding: '8px',
    backgroundColor: 'transparent',
    border: '1px solid #eaeaea',
    cursor: 'pointer'
  },
  activeToggle: {
    backgroundColor: '#0070f3',
    color: 'white',
    borderColor: '#0070f3'
  }
};

export type TodoPageProps = {
  /**
   * GraphQL server URL
   */
  serverUrl?: string;
};

type PageMode = 'simple' | 'enhanced';
type PageView = 'quick-notes' | 'my-tasks' | 'backlog';

export function TodoPage({ serverUrl }: TodoPageProps) {
  const [pageMode, setPageMode] = useState<PageMode>('enhanced');
  const [currentView, setCurrentView] = useState<PageView>('quick-notes');
  const [customPages, setCustomPages] = useState<string[]>([]);
  
  // Create initial todos for each view
  const initialQuickNotes: EnhancedTodo[] = useMemo(() => [
    {
      id: 'qn1',
      text: 'Welcome to Quick Notes',
      completed: false,
      priority: 'medium',
      tags: [{ id: 'idea', name: 'Idea', color: '#4caf50' }]
    },
    {
      id: 'qn2',
      text: 'Add your quick thoughts here',
      completed: false,
      priority: 'low'
    }
  ], []);
  
  const initialMyTasks: EnhancedTodo[] = useMemo(() => [
    {
      id: 'mt1',
      text: 'Welcome to My Tasks',
      completed: false,
      priority: 'high',
      tags: [{ id: 'work', name: 'Work', color: '#2196f3' }]
    },
    {
      id: 'mt2',
      text: 'Track your important tasks here',
      completed: false,
      priority: 'medium'
    }
  ], []);
  
  const initialBacklog: EnhancedTodo[] = useMemo(() => [
    {
      id: 'bl1',
      text: 'Welcome to Backlog',
      completed: false,
      priority: 'low',
      tags: [{ id: 'personal', name: 'Personal', color: '#9c27b0' }]
    },
    {
      id: 'bl2',
      text: 'Keep track of future tasks here',
      completed: false,
      priority: 'medium'
    }
  ], []);
  
  const getPageTitle = (view: PageView | string): string => {
    if (view === 'quick-notes') return 'Quick Notes';
    if (view === 'my-tasks') return 'My Tasks';
    if (view === 'backlog') return 'Backlog';
    if (customPages.includes(view)) return view;
    return 'Todo App';
  };
  
  // Get the appropriate initial todos based on current view
  const getInitialTodos = () => {
    switch (currentView) {
      case 'quick-notes':
        return initialQuickNotes;
      case 'my-tasks':
        return initialMyTasks;
      case 'backlog':
        return initialBacklog;
      default:
        return [];
    }
  };

  const handleAddNewPage = () => {
    // Create a dialog to get the page name
    const pageName = prompt('Enter new page name:');
    if (pageName && pageName.trim()) {
      setCustomPages([...customPages, pageName.trim()]);
      setCurrentView(pageName.trim() as any);
    }
  };

  const renderContent = () => {
    if (pageMode === 'simple') {
      return (
        <ApolloTodoProvider serverUrl={serverUrl || 'http://localhost:5001/graphql'}>
          <TodoList />
        </ApolloTodoProvider>
      );
    }
      return (
        <EnhancedTodoList 
          listId={currentView} 
          initialTodos={getInitialTodos()} 
        />
      );
  };

  return (
    <div style={styles.todoPage}>
      <div style={styles.appContainer}>
        <Sidebar>
          <div style={styles.sidebarContent}>
            <h2 style={styles.sidebarTitle}>Todo App</h2>
            
            <button 
              style={styles.newPageButton}
              onClick={handleAddNewPage}
            >
              + New Page
            </button>
            
            <div style={styles.navLinks}>
              <button 
                style={{
                  ...styles.navLink,
                  ...(currentView === 'my-tasks' ? styles.activeNavLink : {})
                }}
                onClick={() => setCurrentView('my-tasks')}
              >
                <span style={styles.navIcon}>📋</span> My Tasks
              </button>
              
              <button 
                style={{
                  ...styles.navLink,
                  ...(currentView === 'quick-notes' ? styles.activeNavLink : {})
                }}
                onClick={() => setCurrentView('quick-notes')}
              >
                <span style={styles.navIcon}>✏️</span> Quick Notes
              </button>
              
              <button 
                style={{
                  ...styles.navLink,
                  ...(currentView === 'backlog' ? styles.activeNavLink : {})
                }}
                onClick={() => setCurrentView('backlog')}
              >
                <span style={styles.navIcon}>📊</span> Backlog
              </button>
              
              {/* Render custom pages */}
              {customPages.map(page => (
                <button 
                  key={page}
                  style={{
                    ...styles.navLink,
                    ...(currentView === page ? styles.activeNavLink : {})
                  }}
                  onClick={() => setCurrentView(page as any)}
                >
                  <span style={styles.navIcon}>📄</span> {page}
                </button>
              ))}
            </div>
            
            <div style={styles.viewToggle}>
              <button 
                style={{
                  ...styles.toggleButton,
                  ...(pageMode === 'simple' ? styles.activeToggle : {})
                }}
                onClick={() => setPageMode('simple')}
              >
                Simple
              </button>
              <button 
                style={{
                  ...styles.toggleButton,
                  ...(pageMode === 'enhanced' ? styles.activeToggle : {})
                }}
                onClick={() => setPageMode('enhanced')}
              >
                Enhanced
              </button>
            </div>
          </div>
        </Sidebar>
        
        <div style={styles.contentArea}>
          <header style={styles.header}>
            <h1 style={styles.heading}>
              {getPageTitle(currentView)}
            </h1>
          </header>
          
          <main style={styles.main}>
            {renderContent()}
          </main>
          
          <footer style={styles.footer}>
            <p>Todo App © 2025</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
