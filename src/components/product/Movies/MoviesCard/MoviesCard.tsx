/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect, useRef} from 'react';
import {createCn} from 'bem-react-classname';
/* -------------------------------- Generics -------------------------------- */
import * as GenericMoviesCard from '@generic/MoviesCard/MoviesCard';
import SaveButton from '@generic/SaveButton/SaveButton';
/* ---------------------------------- Types --------------------------------- */
import {IMovie, OnSaveFunc, OnDeleteFunc} from 'types/types';
/* ---------------------------------- Texts --------------------------------- */
import {MOVIES} from '@texts/product';
/* -------------------------------------------------------------------------- */
import './MoviesCard.css';

const TEXTS = MOVIES.moviesCard;

export type DataProps = GenericMoviesCard.DataProps;
export type DOMProps = GenericMoviesCard.DOMProps;
export interface FunctionalProps {
  onSave: OnSaveFunc<IMovie>;
  onDelete: OnDeleteFunc<IMovie>;
}
export type Props = DataProps & DOMProps & FunctionalProps;

export function MoviesCard({className, ...props}: Props): JSX.Element {
  const cn = createCn('all-movies-card', className);

  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(props.isSaved);
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
    const movie = {...(props as IMovie), isSaved: !isSaved};
    if (!isSaved) {
      props
        .onSave(movie)
        .then(wrap(() => (val: IMovie) => setIsSaved(val.isSaved)))
        .finally(wrap(() => setIsLoading(false)));
    } else {
      props
        .onDelete(movie)
        .then(wrap(() => (val: IMovie) => setIsSaved(val.isSaved)))
        .finally(wrap(() => setIsLoading(false)));
    }
  }

  return (
    <div
      className={cn()}
      onMouseOver={wrap(() => setIsHovered(true))}
      onMouseLeave={wrap(() => setIsHovered(false))}
      onFocus={wrap(() => setIsHovered(true))}
    >
      <GenericMoviesCard.MoviesCard {...props} />
      <SaveButton
        className={cn('button', {hidden: !isHovered && !isSaved})}
        onClick={handleClick}
        checked={isSaved}
        isLoading={isLoading}
      >
        {isLoading ? TEXTS.button.loadingText : TEXTS.button.text}
      </SaveButton>
    </div>
  );
}

export default MoviesCard;
