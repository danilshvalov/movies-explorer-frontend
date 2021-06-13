import React, {useState} from 'react';
import {createCn} from 'bem-react-classname';
/* -------------------------------- Generics -------------------------------- */
import * as GenericMoviesCard from '@generic/MoviesCard/MoviesCard';
import SaveButton from '@generic/SaveButton/SaveButton';
/* ---------------------------------- Types --------------------------------- */
import {IMovie, OnSaveFunc, OnDeleteFunc} from 'types/types';
/* -------------------------------------------------------------------------- */

export type DataProps = GenericMoviesCard.DataProps;
export type DOMProps = GenericMoviesCard.DOMProps;
export interface FunctionalProps {
  onSave: OnSaveFunc<IMovie>;
  onDelete: OnDeleteFunc<IMovie>;
}
export type Props = DataProps & DOMProps & FunctionalProps;

export function MoviesCard({className, ...props}: Props): JSX.Element {
  const cn = createCn('all-movies-card', className);

  const [isHovered, setIsHovered] = useState(true);
  const [isSaved, setIsSaved] = useState(props.isSaved);

  function handleClick() {
    const movie = {...(props as IMovie), isSaved: !isSaved};
    if (!isSaved) {
      props.onSave(movie).then((old) => setIsSaved(!old));
    } else {
      props.onDelete(movie).then((old) => setIsSaved(!old));
    }
  }

  return (
    <div
      className={cn()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GenericMoviesCard.MoviesCard {...props} />
      <SaveButton
        className={cn('button', {hidden: !isHovered && !isSaved})}
        onClick={handleClick}
      >
        {/* TODO убрать в константы + добавить загрузку */}
        Сохранить
      </SaveButton>
    </div>
  );
}

export default MoviesCard;
