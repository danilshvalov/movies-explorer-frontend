import React from 'react';
import {createCn} from 'bem-react-classname';

import List from '../List/List';
import Preloader from '../Preloader/Preloader';
import {MoviesList, Theme} from '../../utils/types';
import {DefaultMoviesCardProps} from '../DefaultMoviesCard/DefaultMoviesCard';
import Button from '../Button/Button';

import './MoviesCardList.css';
import NothingFoundStub from '../NothingFoundStub/NothingFoundStub';

export interface OnClickFunc {
  (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export interface MoviesCardListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  moviesList: MoviesList;
  isCompleteList: boolean;
  CardComponent: React.FC<DefaultMoviesCardProps>;
  onMoreButtonClick: OnClickFunc;
}

const MoviesCardList: React.FC<MoviesCardListProps> = ({
  className,
  moviesList,
  isCompleteList,
  CardComponent,
  onMoreButtonClick,
  ...props
}) => {
  const [isLoading, setLoading] = React.useState(true);
  const [isMoviesListEmpty, setMoviesListEmpty] = React.useState(false);

  const cn = createCn('movies-list', className);

  React.useEffect(() => {
    setMoviesListEmpty(moviesList.length === 0);
  }, [moviesList]);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const getMarkup = () => (isMoviesListEmpty ? (
      <NothingFoundStub className={cn('nothing-found')} />
  ) : (
      <>
        <List className={cn('card-list')} itemClassName={cn('card')}>
          {moviesList.map(({movieId, ...cardData}) => (
            <CardComponent {...cardData} key={movieId} />
          ))}
        </List>
        {!isCompleteList && (
          <Button
            className={cn('more-button')}
            theme={Theme.Snow}
            onClick={onMoreButtonClick}
          >
            Ещё
          </Button>
        )}
      </>
  ));

  return (
    <div {...props} className={cn()}>
      {isLoading ? <Preloader /> : getMarkup()}
    </div>
  );
};

export default MoviesCardList;
