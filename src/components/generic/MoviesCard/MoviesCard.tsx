import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React from 'react';

import {parseTime, stringifyTime} from '@utils/utils';
import {moviesCard as texts} from '@utils/texts';
import {IMovie} from 'types/types';

import './MoviesCard.css';

export type DataProps = IMovie;
export type DOMProps = React.HTMLAttributes<HTMLDivElement>;
export type Props = DataProps & DOMProps;

/**
 * Миниатюрная карточка фильма
 *
 * Поддерживается карточка с [удалением]{@link DeleteButton}
 *
 * Поддерживается карточка с [сохранением]{@link SaveButton}
 * */
export function MoviesCard({className, ...props}: Props): JSX.Element {
  const cn = createCn('movies-card', className);

  const [isPosterLoading, setPosterLoading] = React.useState(true);

  return (
    <div {...filterInvalidDOMProps(props)} className={cn()}>
      <div className={cn('loading-wrapper', {disabled: !isPosterLoading})}>
        <img
          className={cn('poster')}
          src={props.thumbnail}
          alt={texts.img.alt}
          onLoad={() => setPosterLoading(false)}
        />
      </div>
      <div className={cn('info')}>
        <p className={cn('name')}>{props.nameRU}</p>
        <p className={cn('duration')}>{stringifyTime(parseTime(props.duration))}</p>
      </div>
    </div>
  );
}
export default MoviesCard;
