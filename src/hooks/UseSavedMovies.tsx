import {
  useState, useCallback, Dispatch, SetStateAction,
} from 'react';
/* ---------------------------------- Utils --------------------------------- */
import mainApi from '@utils/api/MainApi';
import {LOCAL_STORAGE_KEYS} from '@utils/config';
/* ---------------------------------- Types --------------------------------- */
import {IMovie, MoviesList} from 'types/types';
/* ---------------------------------- Hooks --------------------------------- */
import useLocalStorage from '@hooks/UseLocalStorage';
/* -------------------------------------------------------------------------- */

export interface ReturnType {
  value: MoviesList | undefined;
  setValue: Dispatch<SetStateAction<MoviesList | undefined>>;
  isLoading: boolean;
  saveMovie: (data: IMovie) => Promise<IMovie>;
  deleteMovie: (data: IMovie) => Promise<IMovie>;
  containsMovie: (data: IMovie) => boolean;
  loadOrRetry: () => Promise<void>;
}

/**
 * Hook загрузки сохраненных фильмов
 *
 * При создании делает вызов к API, а затем самостоятельно поддерживает консистентное состояние
 *
 * @see mainApi
 */
export function useSavedMovies(): ReturnType {
  const [value, setValue] = useLocalStorage<MoviesList>(LOCAL_STORAGE_KEYS.savedMovies);
  const [isLoading, setIsLoading] = useState(false);

  const loadOrRetry = useCallback(() => {
    if (!value) {
      setIsLoading(true);
      return mainApi.getSavedMovies().then((val) => {
        setValue(val);
        setIsLoading(false);
      });
    }
    return Promise.resolve();
  }, [setIsLoading, setValue]);

  const saveMovie = useCallback(
    (data: IMovie) => mainApi.saveMovie(data).then((movie) => {
      setValue((old) => {
        if (old) {
          return [...old, movie];
        }
        return [movie];
      });
      return movie;
    }),
    [value, setValue],
  );

  const deleteMovie = useCallback(
    /**
     * data_.id не должен быть null
     * Если это не так - нарушена логика формирования карточки
     */
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (data: IMovie) => mainApi.deleteMovie(data._id!).then((movie) => {
      setValue((old) => old?.filter((val: IMovie) => {
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
    loadOrRetry,
  };
}

export default useSavedMovies;
