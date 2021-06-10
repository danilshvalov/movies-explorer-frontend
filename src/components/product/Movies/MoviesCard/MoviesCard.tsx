import {createCn} from 'bem-react-classname';

import * as GenericMoviesCard from '@generic/MoviesCard/MoviesCard';
import SaveButton from '@generic/SaveButton/SaveButton';
import {OnSaveFunc} from '@generic/SaveButton/WithSave/WithSave';
import {IMovie} from 'types/types';

export type DataProps = GenericMoviesCard.DataProps;
export type DOMProps = GenericMoviesCard.DOMProps;
export interface FunctionalProps {
  onSave: OnSaveFunc<IMovie>;
  onDelete: OnSaveFunc<IMovie>;
}
export type Props = DataProps & DOMProps & FunctionalProps;

function MoviesCard({className, ...props}: Props): JSX.Element {
  const cn = createCn('all-movies-card', className);
  return <div className={cn()}>
    <MoviesCard {...props} />
    <SaveButton className={cn('button')}>
      {/* TODO убрать в константы + добавить загрузку */}
      Сохранить
    </SaveButton>
  </div>;
}

export default MoviesCard;
