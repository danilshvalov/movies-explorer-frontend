import {createContext} from 'react';

export interface UserContextProps {
  loggedIn: boolean;
  email: string;
  name: string;
}

const CurrentUserContext = createContext<Partial<UserContextProps>>({});

export default CurrentUserContext;
