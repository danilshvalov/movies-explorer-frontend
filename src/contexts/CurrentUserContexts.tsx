import React from 'react';

export type UserContextProps = {
  isLoggedIn: boolean;
};

const CurrentUserContext = React.createContext<Partial<UserContextProps>>({});

export default CurrentUserContext;
