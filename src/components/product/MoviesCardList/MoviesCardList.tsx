import {createCn} from 'bem-react-classname';

import List, {DOMProps as ListDOMProps} from '@generic/List/List';
import Preloader from '@generic/Preloader/Preloader';
import NothingFoundStub from '@generic/NothingFoundStub/NothingFoundStub';

import './MoviesCardList.css';

export interface FunctionalProps {
  isEmpty: boolean;
  isLoading: boolean;
}

export type DOMProps = ListDOMProps;

export type Props = FunctionalProps & DOMProps;

export function MoviesCardList({isEmpty, isLoading, ...props}: Props) {
  const cn = createCn('movies-list');

  /** Markup */
  const ListMarkup = () => (
    <List {...props} className={cn('card-list')} itemClassName={cn('card')}>
      {props.children}
    </List>
  );
  const NotFoundMarkup = () => <NothingFoundStub className={cn('nothing-found')} />;
  const LoadingMarkup = () => <Preloader className={cn('preloader')} />;
  // -----------------------------------------------------------------------

  const CurrentMarkup = () => {
    if (isLoading) {
      return LoadingMarkup();
    }

    if (isEmpty) {
      return NotFoundMarkup();
    }

    return ListMarkup();
  };

  // <div> нужен для выравнивания CSS-классом
  return <div className={cn()}>{CurrentMarkup()}</div>;
}

export default MoviesCardList;
