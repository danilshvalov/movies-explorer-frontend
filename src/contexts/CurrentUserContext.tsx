import {createContext} from 'react';
import {User} from '@types-src/user';

const CurrentUserContext = createContext<Partial<User>>({});

export default CurrentUserContext;
