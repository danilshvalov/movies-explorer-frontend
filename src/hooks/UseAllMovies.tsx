import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
/* ---------------------------------- Utils --------------------------------- */
import moviesApi from '@utils/api/MoviesApi';
/* ---------------------------------- Types --------------------------------- */
import {MoviesList, OnErrorFunc} from 'types/types';
/* -------------------------------------------------------------------------- */

export interface ReturnType {
  value?: MoviesList;
  setValue: Dispatch<SetStateAction<MoviesList | undefined>>;
  isLoading: boolean;
  retry: () => void;
}

export function useAllMovies(errorHandler: OnErrorFunc): ReturnType {
  const [value, setValue] = useState<MoviesList>();
  const [isLoading, setIsLoading] = useState(true);

  const retry = useCallback(() => {
    setIsLoading(true);
    moviesApi
      .getMoviesList()
      .then((movies) => setValue(movies))
      .catch(errorHandler)
      .finally(() => setIsLoading(false));
  }, [setValue, setIsLoading]);

  useEffect(() => {
    retry();
  }, []);

  return {
    value,
    setValue,
    isLoading,
    retry,
  };
}

export default useAllMovies;
