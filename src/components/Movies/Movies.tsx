import {createCn} from 'bem-react-classname';
import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import moviesFilter from '../../utils/movies-filter';
import AlignedMoviesCardList from '../AlignedMoviesCardList/AlignedMoviesCardList';
import DefaultMoviesCard from '../DefaultMoviesCard/DefaultMoviesCard';
import {MoviesList} from '../../utils/types';

import './Movies.css';

export interface MoviesProps extends React.HTMLAttributes<HTMLDivElement> {
  moviesList: MoviesList;
}

/**
 * Returns a page with a list of films
 */
const Movies: React.FC<MoviesProps> = ({className, moviesList, ...props}) => {
  /**
   * Filter flag, toggled by checkbox
   */
  const [isShortFilms, setShortFilms] = React.useState(false);

  const cn = createCn('movies', className);
  return (
    <section {...props} className={cn()}>
      <SearchForm className={cn('search-form')} onChecked={setShortFilms} />
      <AlignedMoviesCardList
        moviesList={moviesFilter({moviesList, isShortFilms})}
        CardComponent={DefaultMoviesCard}
        className={cn('card-list')}
      />
    </section>
  );
};

export default Movies;
