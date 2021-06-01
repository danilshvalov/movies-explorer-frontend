import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React from 'react';

import {parseTime, stringifyTime} from '../../utils/utils';
import {IMovie} from '../../types/types';
import {moviesCard as texts} from '../../utils/texts';
import SaveButtonWrapper, {
  SaveButtonWrapperProps,
} from '../SaveButtonWrapper/SaveButtonWrapper';
import DeleteButtonWrapper, {
  DeleteButtonWrapperProps,
} from '../DeleteButtonWrapper/DeleteButtonWrapper';

import './MoviesCard.css';

export type MoviesCardProps = React.HTMLAttributes<HTMLDivElement> & IMovie;

/**
 * Миниатюрная карточка фильма
 *
 * Поддерживается карточка с [удалением]{@link withDeleteButton}
 *
 * Поддерживается карточка с [сохранением]{@link withSaveButton}
 * */
const MoviesCard = ({
  className,
  thumbnail,
  nameRU,
  duration,
  ...props
}: MoviesCardProps) => {
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
