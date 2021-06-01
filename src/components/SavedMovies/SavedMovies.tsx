import {createCn} from 'bem-react-classname';
import React from 'react';

import {MoviesList} from '../../types/types';
import {withDeleteButton as cardWithDeleteButton} from '../MoviesCard/MoviesCard';
import {DeleteFunc} from '../DeleteButtonWrapper/DeleteButtonWrapper';
import SearchableMoviesCardList from '../SearchableMoviesCardList/SearchableMoviesCardList';

import './SavedMovies.css';

export interface SavedMoviesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Список фильмов, которые могут быть отображены */
  moviesList: MoviesList;
  onDelete: DeleteFunc;
}

/** Секция, включающая в себя список всех сохранённых фильмов и поисковую форму */
const SavedMovies: React.FC<SavedMoviesProps> = ({
  className,
  moviesList,
  onDelete,
  ...props
}) => {
  const cn = createCn('saved-movies', className);

  return (
    <section {...props} className={cn()}>
      <SearchableMoviesCardList
        component={(rest) => cardWithDeleteButton({onDelete, ...rest})}
        className={cn('card-list')}
        moviesList={moviesList}
      />
    </section>
  );
};

export default SavedMovies;
