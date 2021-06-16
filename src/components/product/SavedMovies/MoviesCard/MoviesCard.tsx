import React, {createCn} from 'bem-react-classname';
import {useState} from 'react';
/* -------------------------------- Generics -------------------------------- */
import * as GenericMoviesCard from '@generic/MoviesCard/MoviesCard';
import DeleteButton from '@generic/DeleteButton/DeleteButton';
/* ---------------------------------- Types --------------------------------- */
import {IMovie} from 'types/types';
import {OnDeleteFunc} from 'types/functional';
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

  function handleClick() {
    setIsLoading(true);
    onDelete(props as IMovie);
  }

  return (
    <div
      className={cn()}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
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
