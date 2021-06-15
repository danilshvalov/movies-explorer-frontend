import React, {useEffect, useState} from 'react';
/* --------------------------------- Generic -------------------------------- */
import PreloaderWrapper from '@generic/PreloaderWrapper/PreloaderWrapper';
/* ---------------------------------- Hooks --------------------------------- */
import useSavedMovies from '@hooks/UseSavedMovies';
/* ---------------------------------- Utils --------------------------------- */
import moviesFilter from '@utils/movies-filter';
/* ---------------------------------- Types --------------------------------- */
import {
  IMovie, MoviesList, OnExternalErrorFunc, SearchData,
} from 'types/types';
/* ---------------------------------- Local --------------------------------- */
import MoviesCardList from '@product/SavedMovies/MoviesCardList/MoviesCardList';
import ErrorStub from '@product/SavedMovies/ErrorStub/ErrorStub';
import ErrorWrapper from '@generic/ErrorWrapper/ErrorWrapper';
/* -------------------------------------------------------------------------- */

export interface FunctionalProps {
  searchData?: SearchData;
  onExternalError: OnExternalErrorFunc;
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
export function MoviesManager({
  searchData,
  onExternalError,
}: Props): JSX.Element {
  const [isError, setIsError] = useState(false);

  const savedMovies = useSavedMovies();

  const [filteredMovies, setFilteredMovies] = useState<MoviesList>(
    savedMovies.value || [],
  );

  const handleErrorSet = () => {
    setIsError(true);
  };
  const handleErrorReset = () => {
    savedMovies.loadOrRetry().catch(handleErrorSet);
    setIsError(false);
  };

  const handleDelete = (data: IMovie) => savedMovies
    .deleteMovie(data)
    .then()
    .catch((err) => {
      onExternalError(err);
      return data;
    });

  useEffect(() => {
    savedMovies.loadOrRetry().catch(handleErrorSet);
  }, []);

  useEffect(() => {
    if (savedMovies.value) {
      setFilteredMovies(
        searchData
          ? savedMovies.value.filter((movie) => moviesFilter(movie, searchData))
          : savedMovies.value,
      );
    }
  }, [savedMovies.value, searchData]);

  /** Сброс ошибки при поиске */
  useEffect(() => {
    if (isError) {
      handleErrorReset();
    }
  }, [searchData]);

  return (
    <PreloaderWrapper isLoading={savedMovies.isLoading}>
      <ErrorWrapper
        isError={isError}
        onReset={handleErrorReset}
        fallback={ErrorStub}
      >
        <MoviesCardList
          moviesList={filteredMovies}
          onDelete={handleDelete}
        />
      </ErrorWrapper>
    </PreloaderWrapper>
  );
}

export default MoviesManager;
