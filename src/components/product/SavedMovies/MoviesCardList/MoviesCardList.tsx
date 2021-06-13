import * as GenericList from '@generic/List/List';
import {createCn} from 'bem-react-classname';
import {WithMoviesList} from 'types/types';
import * as Card from '@product/SavedMovies/MoviesCard/MoviesCard';

export type DOMProps = GenericList.DOMProps;
export type DataProps = WithMoviesList;
export type FunctionalProps = Card.FunctionalProps;
export type Props = DOMProps & FunctionalProps & DataProps;

export function MoviesCardList({moviesList, ...props}: Props): JSX.Element {
  const cn = createCn('save-movies-list');

  return (
    <GenericList.List {...props} className={cn()}>
      {moviesList.map((movie) => (
        <Card.MoviesCard
          {...(movie as Card.DataProps & Card.FunctionalProps)}
          key={movie.movieId}
          onDelete={props.onDelete}
        />
      ))}
    </GenericList.List>
  );
}

export default MoviesCardList;
