import {MoviesList} from './types';

export interface moviesFilterProps {
  moviesList: MoviesList;
  isShortFilms: boolean;
}

const moviesFilter = ({moviesList, isShortFilms}: moviesFilterProps) => (isShortFilms
  ? moviesList.filter(({duration}) => duration <= 40)
  : moviesList);

export default moviesFilter;
