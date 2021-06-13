import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';

export function useLocalStorage<T>(
  key: string,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  const [value, setValue] = useState<T | undefined>(() => {
    const item = window.localStorage.getItem(key);
    console.log(JSON.parse(item!));
    if (item) {
      try {
        return JSON.parse(item);
      } catch {
        return undefined;
      }
    }
    return undefined;
  });

  // TODO  доделать

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;
