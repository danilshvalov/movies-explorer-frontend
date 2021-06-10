import React from 'react';

import {MoviesList, ReadablePromise} from '../types/types';

export interface MoviesListsContextProps {
  allMovies: () => ReadablePromise<MoviesList>;
  savedMovies: () => ReadablePromise<MoviesList>;
}
// REMOVE
const MoviesListsContext = React.createContext<Partial<MoviesListsContextProps>>({});
export default MoviesListsContext;
