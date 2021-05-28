import {createCn} from 'bem-react-classname';
import React from 'react';
import moviesFilter from '../../utils/movies-filter';
import {MoviesList} from '../../utils/types';
import AlignedMoviesCardList from '../AlignedMoviesCardList/AlignedMoviesCardList';
import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';

export interface SavedMoviesProps extends React.HTMLAttributes<HTMLDivElement> {
  moviesList: MoviesList;
}

const SavedMovies: React.FC<SavedMoviesProps> = ({className, moviesList, ...props}) => {
  const [isShortFilms, setShortFilms] = React.useState(false);

  const [
    filteredMoviesList,
    setFilteredMoviesList,
  ] = React.useState<MoviesList>(moviesList);

  React.useEffect(() => {
    setFilteredMoviesList(
      moviesFilter({moviesList, isShortFilms}),
    );
  }, [isShortFilms]);

  const cn = createCn('saved-movies', className);
  return (
    <section {...props} className={cn()}>
      <SearchForm className={cn('search-form')} onChecked={setShortFilms} />

      <AlignedMoviesCardList
        moviesList={filteredMoviesList}
        CardComponent={SavedMoviesCard}
        className={cn('card-list')}
      />
    </section>
  );
};

export default SavedMovies;
