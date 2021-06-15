import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
/* ---------------------------------- Utils --------------------------------- */
import moviesApi from '@utils/api/MoviesApi';
/* ---------------------------------- Types --------------------------------- */
import {IMovie, MoviesList} from 'types/types';
/* -------------------------------------------------------------------------- */

export interface ReturnType {
  value?: MoviesList;
  setValue: Dispatch<
    SetStateAction<MoviesList | undefined>
  >;
  isLoading: boolean;
  loadOrRetry: () => Promise<void>;
  /** Добавляет фильм в массив без запроса к API */
  addMovie: (data: IMovie) => void;
  /** Удаляет фильм из массива без запроса к API */
  removeMovie: (data: IMovie) => void;
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
