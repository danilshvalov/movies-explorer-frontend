import {createCn} from 'bem-react-classname';
import {useState} from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
/* -------------------------------- Generics -------------------------------- */
import PageWrapper from '@generic/PageWrapper/PageWrapper';
import SearchForm from '@generic/SearchForm/SearchForm';
/* ---------------------------------- Types --------------------------------- */
import {SearchData} from 'types/types';
/* --------------------------------- Local -------------------------------- */
import MoviesManager from '@product/Movies/MoviesManager/MoviesManager';
/* -------------------------------------------------------------------------- */
import './Movies.css';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

export type DOMProps = React.HTMLAttributes<HTMLDivElement>;

export type Props = DOMProps;

/**
 * Секция, включающая в себя список всех доступных фильмов и поисковую форму
 *
 * Передает поисковый запрос {@link MoviesManager}
 * */
export function Movies({className, ...props}: Props): JSX.Element {
  const cn = createCn('movies', className);

  const [searchData, setSearchData] = useState<SearchData>();

  const handleSearch = (data: SearchData) => {
    setSearchData(data);
  };

  return (
    <section {...filterInvalidDOMProps(props)} className={cn()}>
      <SearchForm className={cn('search-form')} onSearch={handleSearch} />
      {searchData && (
        <ErrorBoundary>
          <MoviesManager searchData={searchData} />
        </ErrorBoundary>
      )}
    </section>
  );
}

export function MoviesPage(props: Props): JSX.Element {
  return (
    <PageWrapper>
      <Movies {...props} />
    </PageWrapper>
  );
}

export default MoviesPage;
