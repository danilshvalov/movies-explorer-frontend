import {createCn} from 'bem-react-classname';
/* -------------------------------- Generics -------------------------------- */
import * as GenericMoviesCard from '@generic/MoviesCard/MoviesCard';
import SaveButton from '@generic/SaveButton/SaveButton';
/* ---------------------------------- Types --------------------------------- */
import {IMovie, OnSaveFunc} from 'types/types';
/* -------------------------------------------------------------------------- */

export type DataProps = GenericMoviesCard.DataProps;
export type DOMProps = GenericMoviesCard.DOMProps;
export interface FunctionalProps {
  onSave: OnSaveFunc<IMovie>;
  onDelete: OnSaveFunc<IMovie>;
}
export type Props = DataProps & DOMProps & FunctionalProps;

export function MoviesCard({className, ...props}: Props): JSX.Element {
  const cn = createCn('all-movies-card', className);
  return (
    <div className={cn()}>
      <GenericMoviesCard.MoviesCard {...props} />
      <SaveButton className={cn('button')}>
        {/* TODO убрать в константы + добавить загрузку */}
        Сохранить
      </SaveButton>
    </div>
  );
}

export default MoviesCard;
