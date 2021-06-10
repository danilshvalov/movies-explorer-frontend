/* eslint-disable typescript-eslint/no-unused-vars */
import {createCn} from 'bem-react-classname';
import {useEffect, useState} from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

// import MoviesCardList from 'components/MoviesCardList';
// import MoviesCardList from 'components/MoviesCardList';

import MoviesCardList from '@components/product/MoviesCardList/MoviesCardList';

import PageWrapper from 'components/PageWrapper/PageWrapper';

import './Movies.css';
import Button from 'components/Button/Button';
import SearchForm, {SearchData} from '@/SearchForm';
import {useExpandableList} from '@utils/hooks';
import {
  IMovie, MoviesList, OnSearchFunc, ReadablePromise, Theme,
} from 'types/types';
import {DEVICES_WIDTHS, MOVIES_AMOUNT_BY_DEVICE} from '@utils/config';
import getDeviceType from '@utils/device-type';
import SaveButtonWrapper, {FunctionalProps as WrapperFunctionalProps} from '@/SaveButtonWrapper';
import Preloader from '@/Preloader';
import moviesFilter from '@utils/movies-filter';
import {OnDeleteFunc, OnSaveFunc} from 'types/MoviesCard';
import {useAllMovies, useSavedMovies} from '@/App';
import PreloaderWrapper from '@/PreloaderWrapper';
import ErrorWrapper from '@generic/ErrorWrapper/ErrorWrapper';

export type DOMProps = React.HTMLAttributes<HTMLDivElement>;

export interface FunctionalProps extends WrapperFunctionalProps {
  onSearch: OnSearchFunc;
  allMovies?: () => ReadablePromise<MoviesList>;
  savedMovies?: () => ReadablePromise<MoviesList>;
}

export type MoviesProps = DOMProps & FunctionalProps;

interface MoviesListProps {
  onSave?: OnSaveFunc;
  onDelete?: OnDeleteFunc;
  searchSettings?: SearchData;
  allMovies?: ReadablePromise<MoviesList>;
  savedMovies?: ReadablePromise<MoviesList>;
}

function MoviesListDetails(props: MoviesListProps) {
  const cn = createCn('movies');

  const {startCount} = MOVIES_AMOUNT_BY_DEVICE[getDeviceType(DEVICES_WIDTHS)];

  const savedMovies = useSavedMovies();
  const allMovies = useAllMovies();

  const list = useExpandableList<IMovie>({
    startCount,
    deviceSettings: DEVICES_WIDTHS,
    countSettings: MOVIES_AMOUNT_BY_DEVICE,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(allMovies.isLoading || savedMovies.isLoading);
  }, [allMovies.isLoading, savedMovies.isLoading]);

  useEffect(() => {
    list.setValue(allMovies.value?.filter((movie) => moviesFilter(movie, props.searchSettings!)));
  }, [props.searchSettings, savedMovies.value, allMovies.value]);

  const MoviesCardMarkup = (data: IMovie) => (
    <SaveButtonWrapper
      {...data}
      key={data.movieId}
      onSave={props.onSave}
      onDelete={props.onDelete}
    />
  );

  function handleMoreButtonClick() {
    list.expand();
  }

  useEffect(() => {
    console.log(allMovies.error?.message);
  }, [allMovies.error]);

  return (
    <ErrorWrapper fallback={<div>ERROR</div>}>
      {allMovies.error || savedMovies.error}
      <PreloaderWrapper isLoading={isLoading}>
        <MoviesCardList className={cn('movies-list')} isEmpty={false} isLoading={false}>
          {list.value
            ?.map((movie): IMovie => {
              const isSaved = savedMovies.containsMovie(movie);
              return {...movie, isSaved};
            })
            .map(MoviesCardMarkup)}
        </MoviesCardList>
        <div className={cn('container')}>
          {!list.isComplete && (
            <Button
              className={cn('more-button')}
              theme={Theme.Snow}
              onClick={handleMoreButtonClick}
            >
              {/* TODO изменить на константу */}
              Ещё
            </Button>
          )}
        </div>
      </PreloaderWrapper>
    </ErrorWrapper>
  );
}

// TODO RENAME
interface MoviesListP {
  onSave?: OnSaveFunc;
  onDelete?: OnDeleteFunc;
  searchSettings?: SearchData;
  allMovies?: ReadablePromise<MoviesList>;
  savedMovies?: ReadablePromise<MoviesList>;
}

const MoviesListMarkup = (props: MoviesListP) => (
  <MoviesListDetails {...props} searchSettings={props.searchSettings} />
);

/** Секция, включающая в себя список всех доступных фильмов и поисковую форму */
const Movies = ({
  className, onSave, onDelete, ...props
}: MoviesProps) => {
  const cn = createCn('movies', className);

  const [isActivated, setActivated] = useState(false);

  const [searchSettings, setSearchSettings] = useState<SearchData>();

  const handleSearch = (data: SearchData) => {
    setSearchSettings(data);
    setActivated(true);
  };

  return (
    <section {...filterInvalidDOMProps(props)} className={cn()}>
      <SearchForm className={cn('search-form')} onSearch={handleSearch} />

      {isActivated && (
        <MoviesListMarkup
          onDelete={onDelete}
          onSave={onSave}
          allMovies={undefined}
          savedMovies={undefined}
          searchSettings={searchSettings}
        />
      )}
    </section>
  );
};
const MoviesPage = (props: MoviesProps) => (
  <PageWrapper>
    <Movies {...props} />
  </PageWrapper>
);
export default MoviesPage;
