import { useState, useEffect } from 'react';

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(
    // --------------------
    function () {
      const storedValue = localStorage.getItem(key);
      // return storedValue ? JSON.parse(storedValue) : initialState;
      if (storedValue !== null) return JSON.parse(storedValue);

      return (typeof initialState === 'function') ? initialState() : initialState;
    },
    // --------------------
  );

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key],
  );

  return [value, setValue];
}
