import React from 'react';
import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

import List from '../List/List';
import Preloader from '../Preloader/Preloader';
import {MoviesList, Theme} from '../../types/types';
import Button from '../Button/Button';
import NothingFoundStub from '../NothingFoundStub/NothingFoundStub';

import './MoviesCardList.css';

export type OnClickFunc = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
) => void;

export interface MoviesCardListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Список фильмов, которые необходимо отрисовать  */
  moviesList: MoviesList;
  /**
   * Весь ли это список или есть ещё фильмы
   * Является маркером для отображения кнопки "Ещё"
   */
  isCompleteList: boolean;
  /**
   * Компонент карточки, который будет отрисовываться
   */
  component: React.ComponentType<any>;
  /**
   * callback нажатия кнопки на карточке
   */
  onMoreButtonClick: OnClickFunc;
}

const MoviesCardList = (props: MoviesCardListProps) => {
  /**
   * Переменна-флаг, необходим для определения отображаемого компонента
   * Если API не подготовил список фильмов - рендерим заглушку
   */
  const [isLoading, setLoading] = React.useState(true);
  /** Переменная-флаг, проверяем пустоту переданного списка. Пустой - рендерим заглушку */
  const [isMoviesListEmpty, setMoviesListEmpty] = React.useState(false);

  const cn = createCn('movies-list', props.className);

  /** Обновляем переменную-флаг при изменении списка */
  React.useEffect(() => {
    setMoviesListEmpty(props.moviesList.length === 0);
  }, [props.moviesList]);

  /** временная заглушка демонстрации работы */
  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  /** Функция, возвращающая основную разметку в зависимости от пустоты списка */
  const getMarkup = () => (isMoviesListEmpty ? (
      <NothingFoundStub className={cn('nothing-found')} />
  ) : (
      <>
        {/** Сам список */}
        <List className={cn('card-list')} itemClassName={cn('card')}>
          {props.moviesList.map((data) => React.createElement(props.component, {
            ...data,
            key: data.movieId,
          }))}
        </List>
        {/** Кнопка "Еще" */}
        <div className={cn('container')}>
          {!props.isCompleteList && (
            <Button
              className={cn('more-button')}
              theme={Theme.Snow}
              onClick={props.onMoreButtonClick}
            >
              Ещё
            </Button>
          )}
        </div>
      </>
  ));

  return (
    <div {...filterInvalidDOMProps(props)} className={cn()}>
      {isLoading ? <Preloader className={cn('preloader')} /> : getMarkup()}
    </div>
  );
};

export default MoviesCardList;
