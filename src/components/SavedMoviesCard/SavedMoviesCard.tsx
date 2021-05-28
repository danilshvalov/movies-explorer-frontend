import {createCn} from 'bem-react-classname';
import React from 'react';

import DeleteButton from '../DeleteButton/DeleteButton';
import MoviesCard, {MoviesCardProps} from '../MoviesCard/MoviesCard';

import './SavedMoviesCard.css';

export type SavedMoviesCardProps = MoviesCardProps;

const SavedMoviesCard: React.FC<SavedMoviesCardProps> = ({
  className,
  ...props
}) => {
  const cn = createCn('saved-movies-card', className);
  const [isButtonVisible, setButtonVisible] = React.useState(false);

  return (
    <div
      className={cn()}
      onMouseEnter={() => setButtonVisible(true)}
      onMouseLeave={() => setButtonVisible(false)}
    >
      <MoviesCard {...props} className={cn('movies-card')} />
      <DeleteButton className={cn('delete-button')} hidden={!isButtonVisible} />
    </div>
  );
};

export default SavedMoviesCard;
