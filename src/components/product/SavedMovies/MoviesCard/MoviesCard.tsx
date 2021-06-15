import React, {createCn} from 'bem-react-classname';
import {useEffect, useRef, useState} from 'react';
/* -------------------------------- Generics -------------------------------- */
import * as GenericMoviesCard from '@generic/MoviesCard/MoviesCard';
import DeleteButton from '@generic/DeleteButton/DeleteButton';
/* ---------------------------------- Types --------------------------------- */
import {IMovie, OnDeleteFunc} from 'types/types';
/* -------------------------------------------------------------------------- */
import './MoviesCard.css';

export interface FunctionalProps {
  onDelete: OnDeleteFunc<IMovie>;
}
export type DOMProps = GenericMoviesCard.DOMProps;
export type DataProps = GenericMoviesCard.DataProps;
export type Props = DOMProps & DataProps & FunctionalProps;

export function MoviesCard({onDelete, ...props}: Props): JSX.Element {
  const cn = createCn('save-movies-card');

  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  function handleClick() {
    setIsLoading(true);
    onDelete(props as IMovie).finally(wrap(() => setIsLoading(false)));
  }

  return (
    <div
      className={cn()}
      onMouseEnter={wrap(() => setIsHovered(true))}
      onMouseLeave={wrap(() => setIsHovered(false))}
    >
      <GenericMoviesCard.MoviesCard {...(props as GenericMoviesCard.Props)} />
      {/** Кнопка появляется при наведении  */}
      <DeleteButton
        className={cn('button')}
        hidden={!isHovered && !isLoading}
        isLoading={isLoading}
        onClick={handleClick}
      />
    </div>
  );
}

export default MoviesCard;
