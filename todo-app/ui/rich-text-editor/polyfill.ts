// Polyfills required for draft-js to work in browser environments
if (typeof window !== 'undefined') {
  // Add global to window
  (window as any).global = window;
  
  // Additional polyfills that draft-js might need
  (global as any).HTMLElement = typeof window !== 'undefined' ? window.HTMLElement : function() {};
  (global as any).HTMLAnchorElement = typeof window !== 'undefined' ? window.HTMLAnchorElement : function() {};
  (global as any).HTMLImageElement = typeof window !== 'undefined' ? window.HTMLImageElement : function() {};
  (global as any).setTimeout = typeof window !== 'undefined' ? window.setTimeout : function() {};
  (global as any).clearTimeout = typeof window !== 'undefined' ? window.clearTimeout : function() {};
}

export default {}; 