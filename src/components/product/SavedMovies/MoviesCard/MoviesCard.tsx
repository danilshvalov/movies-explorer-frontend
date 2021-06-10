import DeleteButton, {OnDeleteFunc} from '@generic/DeleteButton/DeleteButton';
import {IMovie} from 'types/types';

import * as GenericMoviesCard from '@generic/MoviesCard/MoviesCard';
import {createCn} from 'bem-react-classname';
import './MoviesCard.css';
import {useState} from 'react';

export interface FunctionalProps {
  onDelete: OnDeleteFunc<IMovie>;
}
export type DOMProps = GenericMoviesCard.DOMProps;
export type DataProps = GenericMoviesCard.DataProps;
export type Props = DOMProps & DataProps & FunctionalProps;

export function MoviesCard({onDelete, ...props}: Props): JSX.Element {
  const cn = createCn('save-movies-card');

  const [isHovered, setIsHovered] = useState(false);

  function handleClick() {
    onDelete(props as IMovie);
  }

  return (
    <div
      className={cn()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GenericMoviesCard.MoviesCard {...(props as GenericMoviesCard.Props)} />
      {
        /** Кнопка появляется при наведении  */
        isHovered && <DeleteButton className={cn('button')} onClick={handleClick} />
      }
    </div>
  );
}

export default MoviesCard;
