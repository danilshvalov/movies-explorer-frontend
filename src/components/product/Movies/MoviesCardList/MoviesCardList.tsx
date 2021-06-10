import {createCn} from 'bem-react-classname';
/* --------------------------------- Generic -------------------------------- */
import Button from '@generic/Button/Button';
import * as GenericList from '@generic/List/List';
/* ---------------------------------- Hooks --------------------------------- */
import useExpandableList from '@hooks/UseExpandableList';
/* ---------------------------------- Utils --------------------------------- */
import {DEVICES_WIDTHS, MOVIES_AMOUNT_BY_DEVICE} from '@utils/config';
import getDeviceType from '@utils/device-type';
/* ---------------------------------- Types --------------------------------- */
import {IMovie, WithMoviesList} from 'types/types';
/* ---------------------------------- Local --------------------------------- */
import * as Card from '@product/Movies/MoviesCard/MoviesCard';
/* -------------------------------------------------------------------------- */

import './MoviesCardList.css';

export type DOMProps = GenericList.DOMProps;
export type DataProps = WithMoviesList;
export type FunctionalProps = Card.FunctionalProps;
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
    <GenericList.List {...props} className={cn()}>
      {/* TODO добавить error-wrapper */}
      {list.value?.map((data) => (
        <Card.MoviesCard
          {...data}
          {...(props as Card.DataProps & Card.FunctionalProps)}
          key={data.movieId}
        />
      ))}

      <OptionalMoreButton />
    </GenericList.List>
  );
}

export default MoviesCardList;
