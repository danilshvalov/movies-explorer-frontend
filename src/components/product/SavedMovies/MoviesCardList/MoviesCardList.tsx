import React, {createCn} from 'bem-react-classname';
/* -------------------------------- Generics -------------------------------- */
import * as GenericList from '@generic/List/List';
import NothingFoundStub from '@generic/NothingFoundStub/NothingFoundStub';
/* ---------------------------------- Types --------------------------------- */
import {WithMoviesList} from 'types/functional';
/* ---------------------------------- Local --------------------------------- */
import * as Card from '@product/SavedMovies/MoviesCard/MoviesCard';
/* -------------------------------------------------------------------------- */
import './MoviesCardList.css';

export type DOMProps = GenericList.DOMProps;
export type DataProps = WithMoviesList;
export type FunctionalProps = Card.FunctionalProps;
export type Props = DOMProps & FunctionalProps & DataProps;

export function MoviesCardList({moviesList, ...props}: Props): JSX.Element {
  const cn = createCn('save-movies-list', props.className);

  const CardListMarkup = () => (
    <GenericList.List {...props} className={cn()} itemClassName={cn('card')}>
      {moviesList.map((movie) => (
        <Card.MoviesCard
          {...(movie as Card.DataProps & Card.FunctionalProps)}
          key={movie.movieId}
          onDelete={props.onDelete}
        />
      ))}
    </GenericList.List>
  );

  const EmptyStubMarkup = () => (
    <NothingFoundStub className={cn('nothing-stub')} />
  );

  return moviesList.length === 0 ? <EmptyStubMarkup /> : <CardListMarkup />;
}

export default MoviesCardList;
