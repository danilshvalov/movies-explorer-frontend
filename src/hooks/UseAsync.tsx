import {useEffect} from 'react';

export function useAsync(asyncFn: any, onSuccess: any): any {
  useEffect(() => {
    let isActive = true;
    asyncFn().then((data: any) => {
      if (isActive) onSuccess(data);
    });
    return () => {
      isActive = false;
    };
  }, [asyncFn, onSuccess]);
}

export default useAsync;
