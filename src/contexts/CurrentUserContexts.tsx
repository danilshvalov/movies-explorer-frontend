import React from 'react';
import {MoviesList} from '../utils/types';

export type UserContextProps = {
  isLoggedIn: boolean;
  email: string;
  name: string;
  savedMovies: MoviesList;
};

const CurrentUserContext = React.createContext<Partial<UserContextProps>>({});

export default CurrentUserContext;
