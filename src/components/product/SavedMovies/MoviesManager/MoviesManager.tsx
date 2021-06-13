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
/* -------------------------------------------------------------------------- */

export interface FunctionalProps {
  searchData?: SearchData;
}
export type Props = FunctionalProps;

export function MoviesManager({searchData}: Props): JSX.Element {
  const savedMovies = useSavedMovies();

  const [filteredMovies, setFilteredMovies] = useState<MoviesList>(savedMovies.value || []);

  useEffect(() => {
    if (savedMovies.value) {
      setFilteredMovies(searchData
        ? savedMovies.value.filter((movie) => moviesFilter(movie, searchData))
        : savedMovies.value);
    }
  }, [savedMovies.value, searchData]);

  return (
    <PreloaderWrapper isLoading={savedMovies.isLoading}>
      <MoviesCardList moviesList={filteredMovies} onDelete={savedMovies.deleteMovie} />
    </PreloaderWrapper>
  );
}

export default MoviesManager;
