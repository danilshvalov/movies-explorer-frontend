import {createCn} from 'bem-react-classname';
import React from 'react';

import moviesFilter from '../../utils/movies-filter';
import AlignedMoviesCardList, {
  AlignedMoviesCardListProps,
} from '../AlignedMoviesCardList/AlignedMoviesCardList';
import SearchForm, {SearchData} from '../SearchForm/SearchForm';

import './SearchableMoviesCardList.css';

export type SearchableMoviesCardListProps = AlignedMoviesCardListProps;

const SearchableMoviesCardList = ({
  className,
  moviesList,
  ...props
}: SearchableMoviesCardListProps) => {
  const cn = createCn('searchable-movies-list', className);

  /** Переменная-флаг, изменяется посредством checkbox {@link SearchForm} форме поиска */
  /** Переменная-флаг включения плавной анимации */
  const [isChanging, setChanging] = React.useState(false);

  const [searchData, setSearchData] = React.useState<SearchData>({
    isChecked: false,
    query: '',
  });

  /**
   * Фильтрованный список [фильмов]{@link AlignedMoviesCardList}
   *
   * ВАЖНО: не изменять на обычный вызов функции внутри компонента,
   * иначе каждое изменение пересчитывает список
   * */
  const [filteredMoviesList, setFilteredMoviesList] = React.useState(
    moviesList,
  );

  /** При изменении флага  */
  React.useEffect(() => {
    setChanging(true);
    setFilteredMoviesList(
      moviesFilter({
        moviesList,
        isShortFilms: searchData.isChecked,
        query: searchData.query,
      }),
    );
  }, [searchData]);

  return (
    <div className={cn()}>
      {/** Форма поиска фильмов */}
      <SearchForm className={cn('search-form')} onSearch={setSearchData} />
      {/** Список фильмов */}
      <AlignedMoviesCardList
        {...props}
        onAnimationEnd={() => setChanging(false)}
        moviesList={filteredMoviesList}
        className={cn('card-list', {changing: isChanging})}
      />
    </div>
  );
};

export default SearchableMoviesCardList;
