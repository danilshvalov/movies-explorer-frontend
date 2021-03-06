import React, {createCn} from 'bem-react-classname';
/* --------------------------------- Generic -------------------------------- */
import Button from '@generic/Button/Button';
import * as GenericList from '@generic/List/List';
import NothingFoundStub from '@generic/NothingFoundStub/NothingFoundStub';
/* ---------------------------------- Types --------------------------------- */
import {IMovie, Theme} from '@types-src/types';
import {WithMoviesList} from '@types-src/functional';
/* ---------------------------------- Texts --------------------------------- */
import {MOVIES} from '@texts/product';
/* ---------------------------------- Hooks --------------------------------- */
import {ExpandFunc} from '@hooks/UseExpandableList';
/* ---------------------------------- Local --------------------------------- */
import * as Card from '@product/Movies/MoviesCard/MoviesCard';
/* -------------------------------------------------------------------------- */
import './MoviesCardList.css';

const TEXTS = MOVIES.moviesCardList;

export type DOMProps = GenericList.DOMProps;
export type DataProps = WithMoviesList;
export interface FunctionalProps
  extends Card.FunctionalProps {
  isComplete: boolean;
  onExpand: ExpandFunc;
}
export type Props = DOMProps & FunctionalProps & DataProps;

function MoviesCardList({
  moviesList,
  isComplete,
  onExpand,
  ...props
}: Props): JSX.Element {
  const cn = createCn('all-movies-list');

  /** Кнопка, появляющаяся при возможности добавления карточек */
  function OptionalMoreButton(): JSX.Element {
    return isComplete ? (
      <></>
    ) : (
      <Button
        className={cn('more-button')}
        onClick={onExpand}
        theme={Theme.Snow}
      >
        {TEXTS.moreButton.text}
      </Button>
    );
  }

  function CardListMarkup(): JSX.Element {
    return (
      <>
        <GenericList.List
          {...props}
          className={cn()}
          itemClassName={cn('card')}
        >
          {moviesList.map((data) => (
            <Card.MoviesCard
              {...(data as IMovie)}
              key={data.movieId}
              onSave={props.onSave}
              onDelete={props.onDelete}
            />
          ))}
        </GenericList.List>
        <OptionalMoreButton />
      </>
    );
  }

  function EmptyStubMarkup(): JSX.Element {
    return (
      <NothingFoundStub className={cn('nothing-stub')} />
    );
  }

  return moviesList.length === 0 ? (
    <EmptyStubMarkup />
  ) : (
    <CardListMarkup />
  );
}

export default MoviesCardList;
