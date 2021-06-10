import React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';

import {PAGE_LINKS} from '@utils/config';
import CurrentUserContext from '@contexts/CurrentUserContext';

export interface ProtectedRouteProps extends RouteProps {}

const ProtectedRoute = ({...rest}: ProtectedRouteProps) => {
  const {loggedIn: isLoggedIn} = React.useContext(CurrentUserContext);
  const renderComponent = () => {
    if (!isLoggedIn) {
      return <Redirect to={PAGE_LINKS.signIn} />;
    }
    return <Route {...rest} />;
  };
  return <>{renderComponent()}</>;
};

export default ProtectedRoute;
