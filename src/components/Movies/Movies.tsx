import {createCn} from 'bem-react-classname';
import React from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesList from '../../utils/moviesDB';
import SearchForm from '../SearchForm/SearchForm';

import './Movies.css';

export type MoviesProps = React.HTMLAttributes<HTMLDivElement>;

const Movies: React.FC<MoviesProps> = ({className, ...props}) => {
  const [isShortFilms, setShortFilms] = React.useState(false);

  React.useEffect(() => {
    console.log(isShortFilms);
  }, [isShortFilms]);

  const cn = createCn('movies', className);
  return (
    <section {...props} className="movies">
      <SearchForm className={cn('search-form')} onChecked={setShortFilms} />
      <MoviesCardList
        moviesList={moviesList}
        isShortFilms={isShortFilms}
        className="movies__card-list"
      ></MoviesCardList>
    </section>
  );
};

export default Movies;
