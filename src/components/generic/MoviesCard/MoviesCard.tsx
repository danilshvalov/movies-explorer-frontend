import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React, {useEffect, useRef} from 'react';
/* ---------------------------------- Utils --------------------------------- */
import {parseTime, stringifyTime} from '@utils/utils';
/* ---------------------------------- Texts --------------------------------- */
import {MOVIES_CARD as TEXTS} from '@texts/generic';
/* ---------------------------------- Types --------------------------------- */
import {IMovie} from 'types/types';
/* -------------------------------------------------------------------------- */

import './MoviesCard.css';

export type DataProps = IMovie;
export type DOMProps = React.HTMLAttributes<HTMLDivElement>;
export type Props = DataProps & DOMProps;

/**
 * Миниатюрная карточка фильма
 * */
export function MoviesCard({className, ...props}: Props): JSX.Element {
  const cn = createCn('movies-card', className);

  const [isPosterLoading, setPosterLoading] = React.useState(true);

  /** Избавляемся от утечек памяти при размонтировании */
  const isMounted = useRef(true);
  /** Сама обертка */
  function wrap(action: () => void) {
    return () => {
      if (isMounted.current) {
        action();
      }
    };
  }

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );

  return (
    <div {...filterInvalidDOMProps(props)} className={cn()}>
      <div className={cn('loading-wrapper', {disabled: !isPosterLoading})}>
        <img
          className={cn('poster')}
          src={props.thumbnail}
          alt={TEXTS.img.alt}
          onLoad={wrap(() => setPosterLoading(false))}
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
