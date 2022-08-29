import { useEffect, useState } from 'react';

const usePersistState = (initialValue, localStorageKey) => {
  const [value, setValue] = useState(() => {
    try {
      const valueFromLS = localStorage.getItem(localStorageKey);

      return valueFromLS ? JSON.parse(valueFromLS) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value, localStorageKey]);

  return [value, setValue];
};

export default usePersistState;
