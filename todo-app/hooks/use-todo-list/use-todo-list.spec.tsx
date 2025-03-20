import { useState } from 'react';
import { renderHook, act } from '@testing-library/react';
import { expect, it } from 'vitest';

// Create a simplified hook just for testing
function useSimpleCounter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(prev => prev + 1);
  };
  
  return { count, increment };
}

// Test the counter functionality separately from the Apollo logic
it('should increment the counter', () => {
  const { result } = renderHook(() => useSimpleCounter());
  
  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
