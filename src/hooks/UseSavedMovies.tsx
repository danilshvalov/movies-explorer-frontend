import {
  useState, useEffect, useCallback, Dispatch, SetStateAction,
} from 'react';
/* ---------------------------------- Utils --------------------------------- */
import mainApi from '@utils/api/MainApi';
/* ---------------------------------- Types --------------------------------- */
import {IMovie, MoviesList} from 'types/types';
/* ---------------------------------- Hooks --------------------------------- */
import useLocalStorage from './UseLocalStorage';
/* -------------------------------------------------------------------------- */

export interface ReturnType {
  value?: MoviesList;
  setValue: Dispatch<SetStateAction<MoviesList | undefined>>;
  isLoading: boolean;
  saveMovie: (data: IMovie) => Promise<IMovie>;
  deleteMovie: (data: IMovie) => Promise<IMovie>;
  containsMovie: (data: IMovie) => boolean;
}

export function useSavedMovies(): ReturnType {
  const [value, setValue] = useLocalStorage<MoviesList>('saved-movies');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO как обрабатывается ошибка?
    mainApi
      .getSavedMovies()
      .then((movies) => setValue(movies))
      .finally(() => setIsLoading(false));
  }, []);

  const saveMovie = useCallback(
    (data: IMovie) => mainApi.saveMovie(data).then((movie) => {
      setValue((old) => [...old!, movie]);
      return movie;
    }),
    [value, setValue],
  );

  const deleteMovie = useCallback(
    (data: IMovie) => mainApi.deleteMovie(data._id!).then((movie) => {
      setValue((old) => old!.filter((val: IMovie) => {
        if (val._id && movie._id) {
          return val._id !== movie._id;
        }
        return false;
      }));

      return movie;
    }),
    [value, setValue],
  );

  const containsMovie = useCallback(
    (data: IMovie): boolean => {
      const isContains = value?.some((v) => v.movieId === data.movieId);
      // if undefined
      return isContains as boolean;
    },
    [value],
  );

  return {
    value,
    setValue,
    isLoading,
    containsMovie,
    saveMovie,
    deleteMovie,
  };
}

export default useSavedMovies;
