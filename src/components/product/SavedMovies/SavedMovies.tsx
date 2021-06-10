import {useState, HTMLAttributes} from 'react';
import {createCn} from 'bem-react-classname';
/* --------------------------------- Generic -------------------------------- */
import PageWrapper from '@generic/PageWrapper/PageWrapper';
import SearchForm, {SearchData} from '@generic/SearchForm/SearchForm';
/* ---------------------------------- Local --------------------------------- */
import MoviesManager from '@product/SavedMovies/MoviesManager/MoviesManager';
/* -------------------------------------------------------------------------- */
import './SavedMovies.css';

export type DOMProps = HTMLAttributes<HTMLDivElement>;
export type Props = DOMProps;

/** Секция, включающая в себя список всех сохранённых фильмов и поисковую форму */
export function SavedMovies({className, ...props}: Props): JSX.Element {
  const cn = createCn('saved-movies', className);
  const defaultChecked = false;

  const [searchData, setSearchData] = useState<SearchData>({query: '', isChecked: defaultChecked});

  return (
    <section {...props} className={cn()}>
      <SearchForm
        className={cn('search-form')}
        onSearch={setSearchData}
        defaultChecked={defaultChecked}
      />
      <MoviesManager searchData={searchData} />
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
