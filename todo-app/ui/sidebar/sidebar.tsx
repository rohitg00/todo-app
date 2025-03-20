import React, { ReactNode } from 'react';

export type Page = {
  id: string;
  title: string;
  icon?: string;
  type: 'todo' | 'note' | 'database';
};

export type SidebarProps = {
  /**
   * List of pages in the workspace
   */
  pages?: Page[];
  /**
   * Currently active page ID
   */
  activePage?: string;
  /**
   * Callback when a page is selected
   */
  onPageSelect?: (pageId: string) => void;
  /**
   * Callback when a new page is created
   */
  onCreatePage?: (type: 'todo' | 'note' | 'database') => void;
  /**
   * Content to be placed inside the sidebar
   */
  children?: ReactNode;
};

const styles = {
  sidebar: {
    width: '250px',
    backgroundColor: '#f0f0f0',
    borderRight: '1px solid #ddd',
    height: '100vh',
    overflow: 'auto'
  },
  header: {
    padding: '15px',
    borderBottom: '1px solid #ddd'
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0'
  },
  pageList: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  pageItem: {
    padding: '10px 15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #eee'
  },
  activePage: {
    backgroundColor: '#e6e6e6'
  },
  pageIcon: {
    marginRight: '10px',
    fontSize: '16px'
  },
  pageTitle: {
    fontSize: '14px'
  },
  addButton: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    margin: '10px 15px',
    backgroundColor: '#4285f4',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  addButtonText: {
    fontSize: '14px'
  },
  menuDropdown: {
    position: 'absolute',
    backgroundColor: 'white',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    borderRadius: '4px',
    padding: '10px 0',
    zIndex: 10
  },
  menuItem: {
    padding: '8px 15px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export function Sidebar({ 
  pages = [], 
  activePage = '', 
  onPageSelect, 
  onCreatePage, 
  children 
}: SidebarProps) {
  const getPageIcon = (type: string) => {
    switch(type) {
      case 'todo': return '✓';
      case 'note': return '📝';
      case 'database': return '🗃️';
      default: return '📄';
    }
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <h3 style={styles.title}>Workspace</h3>
      </div>
      
      {pages.length > 0 && (
        <ul style={styles.pageList}>
          {pages.map(page => (
            <li 
              key={page.id} 
              style={{
                ...styles.pageItem,
                ...(page.id === activePage ? styles.activePage : {})
              }}
              onClick={() => onPageSelect && onPageSelect(page.id)}
            >
              <span style={styles.pageIcon}>
                {page.icon || getPageIcon(page.type)}
              </span>
              <span style={styles.pageTitle}>{page.title}</span>
            </li>
          ))}
        </ul>
      )}
      
      {onCreatePage && (
        <div>
          <button 
            style={styles.addButton}
            onClick={() => onCreatePage('todo')}
          >
            <span style={styles.addButtonText}>+ New Page</span>
          </button>
        </div>
      )}
      
      {children}
    </div>
  );
}
