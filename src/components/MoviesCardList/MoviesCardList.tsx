import classNames from 'classnames';
import React from 'react';
import List from '../List/List';
import {moviesAmountByDevice} from '../../utils/config';

import './MoviesCardList.css';
import {alignQuantity} from '../../utils/utils';
import PushButton from '../PushButton/PushButton';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

export interface IMovie {
  movieId: number;
  duration: number;
  thumbnail: any;
  nameRU: string;
}

export type IMoviesList = IMovie[];

export interface MoviesFilterProps {
  moviesList: IMovie[];
  count: number;
  isShortFilms: boolean;
}

const MoviesFilter = ({
  moviesList,
  count,
  isShortFilms,
}: MoviesFilterProps) => {
  const list = isShortFilms
    ? moviesList.filter(({duration}) => duration <= 50)
    : moviesList;
  return list.slice(0, count);
};

export interface MoviesCardListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  moviesList: IMovie[];
  isShortFilms: boolean;
}

const MoviesCardList: React.FC<MoviesCardListProps> = ({
  moviesList,
  isShortFilms,
  ...props
}) => {
  const [currentScreenWidth, setCurrentScreenWidth] = React.useState(
    window.innerWidth,
  );

  // Функция делает невозможным превышение счётчиком реального кол-ва карточек
  const [currentCardCount, setCurrentCardCount] = React.useReducer(
    (_: number, newCount: number) => Math.min(moviesList.length, newCount),
    Math.min(moviesList.length, moviesAmountByDevice.desktop.start),
  );

  const [currentMoviesList, setCurrentMoviesList] = React.useState<IMoviesList>(
    [],
  );

  const [currentStep, setCurrentStep] = React.useState(
    moviesAmountByDevice.desktop.step,
  );
  const [isLoading, setLoading] = React.useState(true);
  const [isMoreButtonVisible, setMoreButtonVisible] = React.useState(false);

  // handlers
  const handleMoreButtonClick = () => {
    setCurrentCardCount(currentCardCount + currentStep);
  };

  // -----------------------------------------------------------------------

  // effects
  React.useEffect(() => {
    setCurrentMoviesList(
      MoviesFilter({
        moviesList,
        count: moviesList.length,
        isShortFilms,
      }),
    );
  }, [currentCardCount, isShortFilms]);

  React.useEffect(() => {
    setMoreButtonVisible(currentCardCount < currentMoviesList.length);
  }, [currentCardCount, currentMoviesList]);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  // Ловим изменение текущего разрешения
  React.useEffect(() => {
    const handleResize = () => {
      setCurrentScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Изменяем шаг и кол-во в зависимости от разрешения
  React.useEffect(() => {
    const {desktop, tablet, phone} = moviesAmountByDevice;

    if (currentScreenWidth > tablet.width) {
      setCurrentStep(desktop.step);
    } else if (currentScreenWidth > phone.width) {
      setCurrentStep(tablet.step);
    } else {
      setCurrentStep(phone.step);
    }
  }, [currentScreenWidth, isShortFilms]);

  React.useEffect(() => {
    // Выравнивание делается для того, чтобы, при изменении размера,
    // вся сетка была занята карточками, если это возможно
    setCurrentCardCount(alignQuantity(currentCardCount, currentStep));
  }, [currentStep]);
  // -----------------------------------------------------------------------

  const className = classNames('movies-list', props.className);
  return (
    <div className={className}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <List
            className="movies-list__card-list"
            itemClassName="movies-list__card"
          >
            {currentMoviesList
              .slice(0, currentCardCount)
              .map(({movieId, ...cardData}) => (
                <MoviesCard key={movieId} {...cardData} />
              ))}
          </List>

          {isMoreButtonVisible && (
            <PushButton
              className="movies-list__more-button"
              theme="snow"
              onClick={handleMoreButtonClick}
            >
              Ещё
            </PushButton>
          )}
        </>
      )}
    </div>
  );
};

export default MoviesCardList;
