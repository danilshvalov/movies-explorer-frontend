import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
/* ---------------------------------- Utils --------------------------------- */
import moviesApi from '@utils/api/MoviesApi';
/* ---------------------------------- Types --------------------------------- */
import {MoviesList} from 'types/types';
/* -------------------------------------------------------------------------- */

export interface ReturnType {
  value?: MoviesList;
  setValue: Dispatch<SetStateAction<MoviesList | undefined>>;
  isLoading: boolean;
  loadOrRetry: () => Promise<void>;
}

export function useAllMovies(): ReturnType {
  const [value, setValue] = useState<MoviesList>();
  const [isLoading, setIsLoading] = useState(true);

  const loadOrRetry = useCallback(() => {
    setIsLoading(true);
    return moviesApi
      .getMoviesList()
      .then((movies) => {
        setValue(movies);
      })
      .finally(() => setIsLoading(false));
  }, [setValue, setIsLoading]);

  return {
    value,
    setValue,
    isLoading,
    loadOrRetry,
  };
}

export default useAllMovies;
