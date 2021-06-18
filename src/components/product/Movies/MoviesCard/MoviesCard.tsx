import React, {useState} from 'react';
import {createCn} from 'bem-react-classname';
/* -------------------------------- Generics -------------------------------- */
import * as GenericMoviesCard from '@generic/MoviesCard/MoviesCard';
import SaveButton from '@generic/SaveButton/SaveButton';
/* ---------------------------------- Types --------------------------------- */
import {IMovie} from 'types/types';

import {OnSaveFunc, OnDeleteFunc} from 'types/functional';
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
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    setIsLoading(true);
    const movie = {...(props as IMovie)};
    if (!props.isSaved) {
      props.onSave(movie);
    } else {
      props.onDelete(movie);
    }
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  return (
    <div
      className={cn()}
      onMouseOver={handleMouseEnter}
      onFocus={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <GenericMoviesCard.MoviesCard {...props} />
      <SaveButton
        className={cn('button', {
          hidden: !isHovered && !props.isSaved,
        })}
        onClick={handleClick}
        checked={props.isSaved}
        isLoading={isLoading}
      >
        {isLoading ? TEXTS.button.loadingText : TEXTS.button.text}
      </SaveButton>
    </div>
  );
}

export default MoviesCard;
