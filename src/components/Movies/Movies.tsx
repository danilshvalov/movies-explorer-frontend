import {createCn} from 'bem-react-classname';
import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

import {SaveFunc} from '../SaveButtonWrapper/SaveButtonWrapper';
import {MoviesList} from '../../types/types';
import SearchableMoviesCardList from '../SearchableMoviesCardList/SearchableMoviesCardList';
import {withSaveButton as cardWithSaveButton} from '../MoviesCard/MoviesCard';

import './Movies.css';

export interface MoviesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Список фильмов, которые могут быть отображены */
  moviesList: MoviesList;
  onSave: SaveFunc;
}

/** Секция, включающая в себя список всех доступных фильмов и поисковую форму */
const Movies = ({
  className, moviesList, onSave, ...props
}: MoviesProps) => {
  const cn = createCn('movies', className);

  return (
    <section {...filterInvalidDOMProps(props)} className={cn()}>
      <SearchableMoviesCardList
        className={cn('card-list')}
        moviesList={moviesList}
        component={(rest) => cardWithSaveButton({onSave, ...rest})}
      />
    </section>
  );
};

export default Movies;
