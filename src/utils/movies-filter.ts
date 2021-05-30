import {MoviesList} from './types';

export interface moviesFilterProps {
  moviesList: MoviesList;
  isShortFilms: boolean;
  query: string;
}

function moviesFilter({moviesList, isShortFilms, query}: moviesFilterProps) {
  // FEATURE добавить логику
  // Консоль будет убрана при реализации логики
  // eslint-disable-next-line no-console
  console.log('moviesFilter query:', query);
  return isShortFilms
    ? moviesList.filter(({duration}) => duration <= 40)
    : moviesList;
}

export default moviesFilter;
