import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';

export function useLocalStorage<T>(
  key: string,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  const [value, setValue] = useState<T | undefined>();

  // TODO  доделать
  // const item = window.localStorage.getItem(key);
  // return item ? JSON.parse(item) : null;

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;
