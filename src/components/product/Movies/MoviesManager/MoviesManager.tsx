import {useEffect, useState} from 'react';
/* --------------------------------- Generic -------------------------------- */
import PreloaderWrapper from '@generic/PreloaderWrapper/PreloaderWrapper';
/* ---------------------------------- Hooks --------------------------------- */
import useAllMovies from '@hooks/UseAllMovies';
import useSavedMovies from '@hooks/UseSavedMovies';
/* ---------------------------------- Types --------------------------------- */
import {MoviesList, SearchData} from 'types/types';
/* ---------------------------------- Utils --------------------------------- */
import moviesFilter from '@utils/movies-filter';
/* ---------------------------------- Local --------------------------------- */
import MoviesCardList from '@product/Movies/MoviesCardList/MoviesCardList';
import ErrorStub from '@product/Movies/ErrorStub/ErrorStub';
import ErrorWrapper from '@generic/ErrorWrapper/ErrorWrapper';
/* -------------------------------------------------------------------------- */

export interface FunctionalProps {
  searchData: SearchData;
}
export type Props = FunctionalProps;

/**
 * Компонент, управляющий фильмами
 *
 * Получает списки фильмов с помощью хуков
 * Фильтрует фильмы по заданному запросу
 * Пустой запрос считается некорректным
 *
 * @see useAllMovies
 * @see useSavedMovies
 * */
function MoviesManager({searchData}: Props): JSX.Element {
  const [isError, setIsError] = useState(false);
  const handleErrorReset = () => setIsError(false);
  const handleErrorSet = () => setIsError(true);

  const [isLoading, setIsLoading] = useState(true);
  const allMovies = useAllMovies();
  const savedMovies = useSavedMovies(handleErrorSet);
  const [filteredMovies, setFilteredMovies] = useState<MoviesList>([]);

  useEffect(() => {
    setIsLoading(allMovies.isLoading || savedMovies.isLoading);
  }, [allMovies.isLoading, savedMovies.isLoading]);

  useEffect(() => {
    if (allMovies.value && savedMovies.value) {
      setFilteredMovies(
        allMovies.value
          .filter((movie) => moviesFilter(movie, searchData))
          .map((movie) => {
            if (savedMovies.value) {
              return {
                ...movie,
                isSaved: savedMovies.value.some(
                  (other) => movie.movieId === other.movieId,
                ),
              };
            }
            return {...movie, isSaved: false};
          }),
      );
    }
  }, [allMovies.value, savedMovies.value, searchData]);

  return (
    <PreloaderWrapper isLoading={isLoading}>
      <ErrorWrapper
        isError={isError}
        onReset={handleErrorReset}
        fallback={ErrorStub}
      >
        <MoviesCardList
          onSave={savedMovies.saveMovie}
          onDelete={savedMovies.deleteMovie}
          moviesList={filteredMovies}
        />
      </ErrorWrapper>
    </PreloaderWrapper>
  );
}

export default MoviesManager;
