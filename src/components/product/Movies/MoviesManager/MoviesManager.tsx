import {SearchData} from '@generic/SearchForm/SearchForm';
import {useAllMovies, useSavedMovies} from '@product/App/App';

import MoviesCardList from '@product/Movies/MoviesCardList/MoviesCardList';
import moviesFilter from '@utils/movies-filter';
import {useEffect, useState} from 'react';
import {MoviesList} from 'types/types';
import PreloaderWrapper from '@generic/PreloaderWrapper/PreloaderWrapper';

export interface FunctionalProps {
  searchData: SearchData;
}
export type Props = FunctionalProps;

/**
 * Компонент, управляющий фильмами
 *
 * Получает списки фильмов с помощью хуков
 * Фильтрует фильмы по заданному запросу
 *
 * @see useAllMovies
 * @see useSavedMovies
 * */
function MoviesManager({searchData}: Props): JSX.Element {
  const allMovies = useAllMovies();
  const savedMovies = useSavedMovies();

  const [filteredMovies, setFilteredMovies] = useState<MoviesList>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(allMovies.isLoading || savedMovies.isLoading);
  }, [allMovies.isLoading, savedMovies.isLoading]);

  useEffect(() => {
    if (allMovies.value && savedMovies.value) {
      setFilteredMovies(
        allMovies.value
          .filter((movie) => moviesFilter(movie, searchData))
          .map((movie) => ({
            ...movie,
            isSaved: savedMovies.value!.some((other) => movie.movieId === other.movieId),
          })),
      );
    }
  }, [allMovies.value, savedMovies.value, searchData]);

  return (
    <PreloaderWrapper isLoading={isLoading}>
      <MoviesCardList
        onSave={savedMovies.saveMovie}
        onDelete={savedMovies.deleteMovie}
        moviesList={filteredMovies}
      />
    </PreloaderWrapper>
  );
}

export default MoviesManager;
