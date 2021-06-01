import React from 'react';
import {MoviesList} from '../types/types';

export interface UserContextProps {
  isLoggedIn: boolean;
  email: string;
  name: string;
  savedMovies: MoviesList;
}

const CurrentUserContext = React.createContext<Partial<UserContextProps>>({});

export default CurrentUserContext;
