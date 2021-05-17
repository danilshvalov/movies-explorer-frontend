import {createCn} from 'bem-react-classname';
import React from 'react';
import moviesList from '../../utils/moviesDB';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

export type SavedMoviesProps = React.HTMLAttributes<HTMLDivElement>;

const SavedMovies: React.FC<SavedMoviesProps> = ({className, ...props}) => {
  const cn = createCn('saved-movies', className);
  return (
    <section {...props} className={cn()}>
      <MoviesCardList
        moviesList={moviesList.filter(({isSaved}) => isSaved)}
        className={cn('movies-list')}
        isShortFilms={true}
      ></MoviesCardList>
    </section>
  );
};

export default SavedMovies;
