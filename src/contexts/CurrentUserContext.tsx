import {createContext} from 'react';
import {User} from 'types/types';

const CurrentUserContext = createContext<Partial<User>>({});

export default CurrentUserContext;
