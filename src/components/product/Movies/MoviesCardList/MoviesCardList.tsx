import {createCn} from 'bem-react-classname';
// generics
import Button from '@generic/Button/Button';
import * as GenericList from '@generic/List/List';
// utils
import {DEVICES_WIDTHS, MOVIES_AMOUNT_BY_DEVICE} from '@utils/config';
import getDeviceType from '@utils/device-type';
import {useExpandableList} from '@utils/hooks';
// types
import {IMovie, WithMoviesList} from 'types/types';
// product
import MoviesCard, {
  FunctionalProps as MovieCardFuncProps,
} from '@product/Movies/MoviesCard/MoviesCard';
// local
import './MoviesCardList.css';

export type DOMProps = GenericList.DOMProps;
export type FunctionalProps = MovieCardFuncProps;
export type DataProps = WithMoviesList;
export type Props = DOMProps & FunctionalProps & DataProps;

function MoviesCardList({moviesList, ...props}: Props): JSX.Element {
  const cn = createCn('all-movies-list');
  const {startCount} = MOVIES_AMOUNT_BY_DEVICE[getDeviceType(DEVICES_WIDTHS)];

  const list = useExpandableList<IMovie>(
    {
      startCount,
      deviceSettings: DEVICES_WIDTHS,
      countSettings: MOVIES_AMOUNT_BY_DEVICE,
    },
    moviesList,
  );

  /** Кнопка, появляющаяся при возможности добавления карточек */
  const OptionalMoreButton = () => (list.isComplete ? null : (
  /** TODO переместить текст + добавить состояние загрузки  */ <Button
        className={cn('more-button')}
      >
        Сохранить
      </Button>
  ));

  return (
    <GenericList.default className={cn()}>
      {/* TODO добавить error-wrapper */}
      {list.value?.map((data) => (
        <MoviesCard {...data} {...(props as MovieCardFuncProps)} key={data.movieId} />
      ))}

      <OptionalMoreButton />
    </GenericList.default>
  );
}

export default MoviesCardList;
