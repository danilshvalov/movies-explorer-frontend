import {createContext} from 'react';
import {User} from 'types/user';

const CurrentUserContext = createContext<Partial<User>>({});

export default CurrentUserContext;
