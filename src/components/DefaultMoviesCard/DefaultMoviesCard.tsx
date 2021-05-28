import {createCn} from 'bem-react-classname';
import React from 'react';

import MoviesCard, {MoviesCardProps} from '../MoviesCard/MoviesCard';
import SaveButton from '../SaveButton/SaveButton';

import './DefaultMoviesCard.css';

export type DefaultMoviesCardProps = MoviesCardProps;

const DefaultMoviesCard: React.FC<DefaultMoviesCardProps> = ({
  className,
  ...props
}) => {
  const cn = createCn('default-movies-card', className);
  const [isHovered, setHovered] = React.useState(false);
  const [isChecked, setChecked] = React.useState(false);

  const handleSaveButtonClick = () => setChecked(!isChecked);

  return (
    <div
      className={cn()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <MoviesCard {...props} className={cn('movies-card')} />
      <SaveButton
        className={cn('save-button')}
        hidden={!isHovered && !isChecked}
        checked={isChecked}
        onClick={handleSaveButtonClick}
      />
    </div>
  );
};

export default DefaultMoviesCard;
