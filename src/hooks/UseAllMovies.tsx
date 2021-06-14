import {
  Dispatch, SetStateAction, useEffect, useState,
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
}

export function useAllMovies(): ReturnType {
  const [value, setValue] = useState<MoviesList>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (error) {
      const copy = error;
      setError(undefined);
      throw copy;
    }
  }, [error]);

  useEffect(() => {
    moviesApi
      .getMoviesList()
      .then((movies) => setValue(movies))
      .catch((err) => {
        setError(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    value,
    setValue,
    isLoading,
  };
}

export default useAllMovies;
