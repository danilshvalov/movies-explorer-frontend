import {
  Dispatch, SetStateAction, useCallback, useState,
} from 'react';
/* ---------------------------------- Utils --------------------------------- */
import moviesApi from '@utils/api/MoviesApi';
import {LOCAL_STORAGE_KEYS} from '@utils/config';
/* ---------------------------------- Types --------------------------------- */
import {IMovie, MoviesList} from 'types/types';
/* ---------------------------------- Hooks --------------------------------- */
import useLocalStorage from '@hooks/UseLocalStorage';
/* -------------------------------------------------------------------------- */

export interface ReturnType {
  value?: MoviesList | undefined;
  setValue: Dispatch<SetStateAction<MoviesList | undefined>>;
  isLoading: boolean;
  loadOrRetry: () => Promise<void>;
  /** Добавляет фильм в массив без запроса к API */
  addMovie: (data: IMovie) => void;
  /** Удаляет фильм из массива без запроса к API */
  removeMovie: (data: IMovie) => void;
}

/**
 * Hook загрузки всех фильмов
 *
 * @see {@link moviesApi}
 */
export function useAllMovies(): ReturnType {
  const [value, setValue] = useLocalStorage<MoviesList>(
    LOCAL_STORAGE_KEYS.allMovies,
  );
  const [isLoading, setIsLoading] = useState(false);

  /* -------------------------------- Handlers -------------------------------- */

  function handlePreLoading() {
    setIsLoading(true);
  }

  function handleFinalization() {
    setIsLoading(false);
  }

  function handleSuccessLoading(movies: MoviesList) {
    setValue(movies);
  }

  /* --------------------------- Exported functions --------------------------- */

  const loadOrRetry = useCallback(() => {
    if (!value) {
      handlePreLoading();
      return moviesApi
        .getMoviesList()
        .then(handleSuccessLoading)
        .finally(handleFinalization);
    }
    return Promise.resolve();
  }, [setValue, setIsLoading]);

  const addMovie = useCallback(
    (movie: IMovie) => {
      setValue((old) => old?.map((val) => (val.movieId === movie.movieId
        ? {...movie, isSaved: true}
        : val)));
    },
    [setValue],
  );

  const removeMovie = useCallback(
    (movie: IMovie) => {
      setValue((old) => old?.map((val) => (val.movieId === movie.movieId
        ? {...movie, isSaved: false}
        : val)));
    },
    [setValue],
  );

  return {
    value,
    setValue,
    isLoading,
    loadOrRetry,
    addMovie,
    removeMovie,
  };
}

export default useAllMovies;
