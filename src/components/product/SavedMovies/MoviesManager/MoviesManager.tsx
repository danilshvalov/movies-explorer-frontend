import {useEffect, useState} from 'react';
/* --------------------------------- Generic -------------------------------- */
import PreloaderWrapper from '@generic/PreloaderWrapper/PreloaderWrapper';
/* ---------------------------------- Hooks --------------------------------- */
import useSavedMovies from '@hooks/UseSavedMovies';
/* ---------------------------------- Utils --------------------------------- */
import moviesFilter from '@utils/movies-filter';
/* ---------------------------------- Types --------------------------------- */
import {MoviesList, SearchData} from 'types/types';
/* ---------------------------------- Local --------------------------------- */
import MoviesCardList from '@product/SavedMovies/MoviesCardList/MoviesCardList';
import ErrorStub from '@product/SavedMovies/ErrorStub/ErrorStub';
import ErrorWrapper from '@generic/ErrorWrapper/ErrorWrapper';
/* -------------------------------------------------------------------------- */

export interface FunctionalProps {
  searchData?: SearchData;
}
export type Props = FunctionalProps;

/**
 * Компонент, управляющий фильмами
 *
 * Получает список фильмов с помощью хука
 * Фильтрует фильмы по заданному запросу
 * При пустом запросе выводится весь список
 *
 * @see useSavedMovies
 * */
export function MoviesManager({searchData}: Props): JSX.Element {
  const [isError, setIsError] = useState(false);
  const handleErrorReset = () => setIsError(false);
  const handleErrorSet = () => setIsError(true);

  const savedMovies = useSavedMovies(handleErrorSet);

  const [filteredMovies, setFilteredMovies] = useState<MoviesList>(
    savedMovies.value || [],
  );

  useEffect(() => {
    if (savedMovies.value) {
      setFilteredMovies(
        searchData
          ? savedMovies.value.filter((movie) => moviesFilter(movie, searchData))
          : savedMovies.value,
      );
    }
  }, [savedMovies.value, searchData]);

  return (
    <PreloaderWrapper isLoading={savedMovies.isLoading}>
      <ErrorWrapper
        isError={isError}
        onReset={handleErrorReset}
        fallback={ErrorStub}
      >
        <MoviesCardList
          moviesList={filteredMovies}
          onDelete={savedMovies.deleteMovie}
        />
      </ErrorWrapper>
    </PreloaderWrapper>
  );
}

export default MoviesManager;
