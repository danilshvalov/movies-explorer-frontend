import React from 'react';

import {devicesWidth, moviesAmountByDevice} from '../../utils/config';
import getDeviceType from '../../utils/device-type';
import {alignQuantity} from '../../utils/utils';
import MoviesCardList, {
  MoviesCardListProps,
} from '../MoviesCardList/MoviesCardList';

export type AlignedMoviesCardListProps = Omit<
  MoviesCardListProps,
  'isCompleteList' | 'onMoreButtonClick'
>;

/** Выравненный под разрешение список с фильмами */
const AlignedMoviesCardList = ({
  moviesList,
  ...props
}: AlignedMoviesCardListProps) => {
  /** Функция делает невозможным превышение счётчиком реального кол-ва карточек */
  const [currentCardCount, setCurrentCardCount] = React.useReducer(
    (_: number, newCount: number) => {
      if (newCount !== 0) {
        return Math.min(moviesList.length, newCount);
      }
      return Math.min(
        moviesList.length,
        moviesAmountByDevice[getDeviceType(devicesWidth)].startCount,
      );
    },
    Math.min(
      moviesList.length,
      moviesAmountByDevice[getDeviceType(devicesWidth)].startCount,
    ),
  );

  /** Текущий шаг, зависит от разрешения и переданных настроек */
  const [currentStep, setCurrentStep] = React.useState<number>(
    moviesAmountByDevice[getDeviceType(devicesWidth)].step,
  );

  /** Ловим изменение текущего разрешения */
  React.useEffect(() => {
    const handleResize = () => {
      setCurrentStep(moviesAmountByDevice[getDeviceType(devicesWidth)].step);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /** При изменении списка или шага выравниваем список */
  React.useEffect(() => {
    setCurrentCardCount(alignQuantity(currentCardCount, currentStep));
  }, [currentStep, moviesList]);

  function handleMoreButtonClick() {
    setCurrentCardCount(currentStep + currentCardCount);
  }

  return (
    <MoviesCardList
      {...props}
      moviesList={moviesList.slice(0, currentCardCount)}
      isCompleteList={currentCardCount === moviesList.length}
      onMoreButtonClick={handleMoreButtonClick}
    />
  );
};

export default AlignedMoviesCardList;
