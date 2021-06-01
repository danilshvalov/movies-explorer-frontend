import React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';

import {pageLinks} from '../../utils/config';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export type ProtectedRouteProps = RouteProps;

function ProtectedRoute({...props}: ProtectedRouteProps) {
  const {isLoggedIn} = React.useContext(CurrentUserContext);
  return isLoggedIn ? <Route {...props} /> : <Redirect to={pageLinks.signIn} />;
}

export default ProtectedRoute;
