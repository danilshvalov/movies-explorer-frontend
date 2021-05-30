import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React from 'react';

import {parseTime, stringifyTime} from '../../utils/utils';
import {IMovie} from '../../utils/types';
import {moviesCard as texts} from '../../utils/texts';

import './MoviesCard.css';
import SaveButtonWrapper, {
  SaveButtonWrapperProps,
} from '../SaveButtonWrapper/SaveButtonWrapper';
import DeleteButtonWrapper, {
  DeleteButtonWrapperProps,
} from '../DeleteButtonWrapper/DeleteButtonWrapper';

export type MoviesCardProps = React.HTMLAttributes<HTMLDivElement> & IMovie;

/** Миниатюрная карточка фильма */
const MoviesCard: React.FC<MoviesCardProps> = ({
  className,
  thumbnail,
  nameRU,
  duration,
  ...props
}) => {
  const cn = createCn('movies-card', className);

  return (
    <div {...filterInvalidDOMProps(props)} className={cn()}>
      <img className={cn('poster')} src={thumbnail} alt={texts.img.alt} />
      <div className={cn('info')}>
        <p className={cn('name')}>{nameRU}</p>
        <p className={cn('duration')}>{stringifyTime(parseTime(duration))}</p>
      </div>
    </div>
  );
};

export function withSaveButton(
  rest: MoviesCardProps &
    Omit<SaveButtonWrapperProps, 'componentId' | 'component'>,
) {
  return (
    <SaveButtonWrapper
      {...rest}
      componentId={rest.movieId}
      component={MoviesCard}
    />
  );
}

export function withDeleteButton(
  rest: MoviesCardProps &
    Omit<DeleteButtonWrapperProps, 'componentId' | 'component'>,
) {
  return (
    <DeleteButtonWrapper
      {...rest}
      componentId={rest.movieId}
      component={MoviesCard}
    />
  );
}

export default MoviesCard;
