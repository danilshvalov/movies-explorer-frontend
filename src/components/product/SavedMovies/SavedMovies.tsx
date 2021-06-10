/* eslint-disable typescript-eslint/no-unused-vars */
import {createCn} from 'bem-react-classname';
import React from 'react';

import {ButtonTypes, IMovie, MoviesList, OnSearchFunc} from 'types/types';
import PageWrapper from '@PageWrapper/PageWrapper';

import MoviesCardList from '@MoviesCardList/MoviesCardList';

import {OnDeleteFunc} from '@DeleteButton/DeleteButton';

import './SavedMovies.css';
import SearchForm, {SearchData} from '@SearchForm/SearchForm';
import DeleteButtonWrapper from '@DeleteButtonWrapper/DeleteButtonWrapper';

export interface SavedMoviesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Список фильмов, которые могут быть отображены */
  onDelete?: OnDeleteFunc<IMovie>;
  onSearch: OnSearchFunc;
}

/** Секция, включающая в себя список всех сохранённых фильмов и поисковую форму */
const SavedMovies = ({className, onDelete, onSearch, ...props}: SavedMoviesProps) => {
  const cn = createCn('saved-movies', className);

  const [moviesList, setMoviesList] = React.useState<MoviesList>();

  function handleSearch(data: SearchData) {
    setMoviesList(onSearch(data));
  }

  console.log('saved: ', moviesList);

  const MoviesCardMarkup = (data: IMovie) => <DeleteButtonWrapper {...data} key={data.movieId} />;

  return (
    <section {...props} className={cn()}>
      <SearchForm className={cn('search-form')} onSearch={handleSearch} />
      <MoviesCardList isLoading={true} isEmpty={!(moviesList && moviesList.length > 0)}>
        {moviesList?.map(MoviesCardMarkup)}
      </MoviesCardList>
    </section>
  );
};

const SavedMoviesPage = (props: SavedMoviesProps) => (
  <PageWrapper>
    <SavedMovies {...props} />
  </PageWrapper>
);

export default SavedMoviesPage;
