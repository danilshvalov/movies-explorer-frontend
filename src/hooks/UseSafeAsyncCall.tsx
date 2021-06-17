import {useCallback, useEffect, useRef} from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useSafeAsyncCall(): (callback: any, args?: any) => any {
  const isMounted = useRef<boolean>(true);

  const call = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (callback: any, args?: any) => {
      if (isMounted.current) {
        return callback(args);
      }
      return undefined;
    },
    [isMounted],
  );

  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  return call;
}

export default useSafeAsyncCall;
