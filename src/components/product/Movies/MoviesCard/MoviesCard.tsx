import React, {useState} from 'react';
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

  return (
    <div
      className={cn()}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
    >
      <GenericMoviesCard.MoviesCard {...props} />
      <SaveButton
        className={cn('button', {hidden: !isHovered && !props.isSaved})}
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
