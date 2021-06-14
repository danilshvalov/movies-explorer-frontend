import {
  useState, useCallback, Dispatch, SetStateAction, useEffect,
} from 'react';
/* ---------------------------------- Utils --------------------------------- */
import mainApi from '@utils/api/MainApi';
/* ---------------------------------- Types --------------------------------- */
import {IMovie, MoviesList, OnErrorFunc} from 'types/types';
/* ---------------------------------- Hooks --------------------------------- */
import useLocalStorage from './UseLocalStorage';
/* -------------------------------------------------------------------------- */

export interface ReturnType {
  value: MoviesList | undefined;
  setValue: Dispatch<SetStateAction<MoviesList | undefined>>;
  isLoading: boolean;
  saveMovie: (data: IMovie) => Promise<IMovie>;
  deleteMovie: (data: IMovie) => Promise<IMovie>;
  containsMovie: (data: IMovie) => boolean;
}

/**
 * Hook загрузки сохраненных фильмов
 *
 * При создании делает вызов к API, а затем самостоятельно поддерживает консистентное состояние
 *
 * @see mainApi
 */
export function useSavedMovies(errorHandler: OnErrorFunc): ReturnType {
  const [value, setValue] = useLocalStorage<MoviesList>('saved-movies');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!value) {
      setIsLoading(true);
      mainApi.getSavedMovies().then((val) => {
        setValue(val);
        setIsLoading(false);
      }).catch(errorHandler);
    }
  }, []);

  const saveMovie = useCallback(
    (data: IMovie) => mainApi
      .saveMovie(data)
      .then((movie) => {
        setValue((old) => {
          if (old) {
            return [...old, movie];
          }
          return [movie];
        });
        return movie;
      })
      .catch(errorHandler),
    [value, setValue],
  );

  const deleteMovie = useCallback(
    /**
     * data_.id не должен быть null
     * Если это не так - нарушена логика формирования карточки
     */
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (data: IMovie) => {
      console.log('DELETE DATA: ', data);
      return mainApi
        .deleteMovie(data._id!)
        .then((movie) => {
          setValue((old) => old?.filter((val: IMovie) => {
            if (val._id && movie._id) {
              return val._id !== movie._id;
            }
            return false;
          }));

          return movie;
        })
        .catch(errorHandler);
    },
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
