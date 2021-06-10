import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
/* ---------------------------------- Utils --------------------------------- */
import moviesApi from '@utils/api/MoviesApi';
/* ---------------------------------- Types --------------------------------- */
import {MoviesList} from 'types/types';
/* -------------------------------------------------------------------------- */

export interface UseAllMoviesData {
  value?: MoviesList;
  setValue: Dispatch<SetStateAction<MoviesList | undefined>>;
  isLoading: boolean;
}

export function useAllMovies(): UseAllMoviesData {
  const [value, setValue] = useState<MoviesList>();
  const [isLoading, setIsLoading] = useState(true);

  // TODO как обрабатывается ошибка?
  useEffect(() => {
    moviesApi
      .getMoviesList()
      .then((movies) => setValue(movies))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    value,
    setValue,
    isLoading,
  };
}

export default useAllMovies;
