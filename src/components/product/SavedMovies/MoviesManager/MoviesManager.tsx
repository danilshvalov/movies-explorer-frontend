import {useEffect, useState} from 'react';
/* --------------------------------- Generic -------------------------------- */
import PreloaderWrapper from '@generic/PreloaderWrapper/PreloaderWrapper';
import {SearchData} from '@generic/SearchForm/SearchForm';
/* ---------------------------------- Hooks --------------------------------- */
import useSavedMovies from '@hooks/UseSavedMovies';
/* ---------------------------------- Utils --------------------------------- */
import moviesFilter from '@utils/movies-filter';
/* ---------------------------------- Types --------------------------------- */
import {MoviesList} from 'types/types';
/* ---------------------------------- Local --------------------------------- */
import MoviesCardList from '@product/SavedMovies/MoviesCardList/MoviesCardList';
/* -------------------------------------------------------------------------- */

export interface FunctionalProps {
  searchData: SearchData;
}
export type Props = FunctionalProps;

export function MoviesManager({searchData}: Props): JSX.Element {
  const savedMovies = useSavedMovies();

  const [filteredMovies, setFilteredMovies] = useState<MoviesList>(savedMovies.value || []);

  useEffect(() => {
    if (savedMovies.value) {
      setFilteredMovies(savedMovies.value.filter((movie) => moviesFilter(movie, searchData)));
    }
  }, [savedMovies.value, searchData]);

  return (
    <PreloaderWrapper isLoading={savedMovies.isLoading}>
      <MoviesCardList moviesList={filteredMovies} onDelete={savedMovies.deleteMovie} />
    </PreloaderWrapper>
  );
}

export default MoviesManager;
