import {createCn} from 'bem-react-classname';
import {useState} from 'react';
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MoviesCard({onDelete, ...props}: Props): JSX.Element {
  const cn = createCn('save-movies-card');

  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    setIsLoading(true);
    onDelete(props as IMovie).finally(() => setIsLoading(false));
  }

  return (
    <div
      className={cn()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
