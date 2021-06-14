import {createCn} from 'bem-react-classname';
/* --------------------------------- Generic -------------------------------- */
import Button from '@generic/Button/Button';
import * as GenericList from '@generic/List/List';
/* ---------------------------------- Types --------------------------------- */
import {IMovie, Theme, WithMoviesList} from 'types/types';
/* ---------------------------------- Texts --------------------------------- */
import {MOVIES} from '@texts/product';
/* ---------------------------------- Local --------------------------------- */
import * as Card from '@product/Movies/MoviesCard/MoviesCard';
/* -------------------------------------------------------------------------- */
import './MoviesCardList.css';

const TEXTS = MOVIES.moviesCardList;

export type DOMProps = GenericList.DOMProps;
export type DataProps = WithMoviesList;
export interface FunctionalProps extends Card.FunctionalProps {
  isComplete: boolean;
  onExpand: () => void;
}
export type Props = DOMProps & FunctionalProps & DataProps;

function MoviesCardList({
  moviesList,
  isComplete,
  onExpand,
  ...props
}: Props): JSX.Element {
  const cn = createCn('all-movies-list');

  /** Кнопка, появляющаяся при возможности добавления карточек */
  function OptionalMoreButton() {
    return isComplete ? null : (
      <Button
        className={cn('more-button')}
        onClick={onExpand}
        theme={Theme.Snow}
      >
        {TEXTS.moreButton.text}
      </Button>
    );
  }

  return (
    <>
      <GenericList.List {...props} className={cn()} itemClassName={cn('card')}>
        {moviesList.map((data) => (
          <Card.MoviesCard
            {...(data as IMovie)}
            key={data.movieId}
            onSave={props.onSave}
            onDelete={props.onDelete}
          />
        ))}
      </GenericList.List>
      <OptionalMoreButton />
    </>
  );
}

export default MoviesCardList;
