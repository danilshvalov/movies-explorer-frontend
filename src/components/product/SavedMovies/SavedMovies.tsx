import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React, {HTMLAttributes} from 'react';
import {createCn} from 'bem-react-classname';
/* --------------------------------- Generic -------------------------------- */
import PageWrapper from '@generic/PageWrapper/PageWrapper';
import SearchForm from '@generic/SearchForm/SearchForm';
/* ---------------------------------- Types --------------------------------- */
import {SearchData} from 'types/types';
import {OnExternalErrorFunc} from 'types/functional';
/* ---------------------------------- Local --------------------------------- */
import MoviesManager from '@product/SavedMovies/MoviesManager/MoviesManager';
/* ---------------------------------- Utils --------------------------------- */
import {LOCAL_STORAGE_KEYS} from '@utils/config';
/* ---------------------------------- Hooks --------------------------------- */
import useLocalStorage from '@hooks/UseLocalStorage';
/* -------------------------------------------------------------------------- */
import './SavedMovies.css';

export type DOMProps = HTMLAttributes<HTMLDivElement>;
export interface FunctionalProps {
  onExternalError: OnExternalErrorFunc;
}
export type Props = FunctionalProps & DOMProps;

/** Секция, включающая в себя список всех сохранённых фильмов и поисковую форму */
export function SavedMovies({className, ...props}: Props): JSX.Element {
  const cn = createCn('saved-movies', className);

  const [searchData, setSearchData] = useLocalStorage<SearchData>(
    LOCAL_STORAGE_KEYS.savedMoviesQuery,
  );

  return (
    <section {...filterInvalidDOMProps(props)} className={cn()}>
      <SearchForm
        className={cn('search-form')}
        onSearch={setSearchData}
        defaultChecked={searchData?.isChecked}
        defaultQuery={searchData?.query}
      />
      <MoviesManager
        searchData={searchData}
        onExternalError={props.onExternalError}
      />
    </section>
  );
}

export function SavedMoviesPage(props: Props): JSX.Element {
  return (
    <PageWrapper>
      <SavedMovies {...props} />
    </PageWrapper>
  );
}

export default SavedMoviesPage;
