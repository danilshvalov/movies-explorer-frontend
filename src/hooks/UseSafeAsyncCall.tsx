import {useCallback, useEffect, useRef} from 'react';

export function useSafeAsyncCall(): (callback: any, args?: any) => any {
  const isMounted = useRef<boolean>(true);

  const call = useCallback(
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
