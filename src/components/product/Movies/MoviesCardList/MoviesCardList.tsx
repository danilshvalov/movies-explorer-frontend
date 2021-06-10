import * as GenericMoviesCardList from '@generic/MoviesCardList/MoviesCardList';
import {SearchData} from '@generic/SearchForm/SearchForm';
import Button from '@generic/Button/Button';
import {DEVICES_WIDTHS, MOVIES_AMOUNT_BY_DEVICE} from '@utils/config';
import getDeviceType from '@utils/device-type';
import {useExpandableList} from '@utils/hooks';
import {createCn} from 'bem-react-classname';
import {IMovie, WithMoviesList} from 'types/types';

import MoviesCard, {
  FunctionalProps as MovieCardFuncProps,
} from '@product/Movies/MoviesCard/MoviesCard';

import './MoviesCardList.css';

export type DOMProps = GenericMoviesCardList.DOMProps;
export interface FunctionalProps
  extends GenericMoviesCardList.FunctionalProps,
    MovieCardFuncProps {
  searchData: SearchData;
}
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
    <GenericMoviesCardList.MoviesCardList
      isEmpty={true}
      isLoading={true}
      className={cn()}
    >
      {/* TODO добавить error-wrapper */}
      {list.value?.map((data) => (
        <MoviesCard
          {...data}
          {...(props as MovieCardFuncProps)}
          key={data.movieId}
        />
      ))}

      <OptionalMoreButton />
    </GenericMoviesCardList.MoviesCardList>
  );
}

export default MoviesCardList;
