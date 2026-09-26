// hooks/useDebounce.js
// Returns a debounced version of a value, useful for search inputs
import { useState, useEffect } from 'react';

export const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};
