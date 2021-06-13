import {createCn} from 'bem-react-classname';
/* -------------------------------- Generics -------------------------------- */
import * as GenericList from '@generic/List/List';
/* ---------------------------------- Types --------------------------------- */
import {WithMoviesList} from 'types/types';
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

  return (
    <GenericList.List {...props} className={cn()}>
      {moviesList.map((movie) => (
        <Card.MoviesCard
          {...(movie as Card.DataProps & Card.FunctionalProps)}
          key={movie.movieId}
          onDelete={props.onDelete}
          className={cn('card')}
        />
      ))}
    </GenericList.List>
  );
}

export default MoviesCardList;
