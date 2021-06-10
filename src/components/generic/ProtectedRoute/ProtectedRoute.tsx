import React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
/* ---------------------------------- Utils --------------------------------- */
import {PAGE_LINKS} from '@utils/config';
/* -------------------------------- Contexts -------------------------------- */
import CurrentUserContext from '@contexts/CurrentUserContext';
/* -------------------------------------------------------------------------- */

export type Props = RouteProps;

export function ProtectedRoute({...rest}: Props): JSX.Element {
  const {loggedIn: isLoggedIn} = React.useContext(CurrentUserContext);
  const renderComponent = () => {
    if (!isLoggedIn) {
      return <Redirect to={PAGE_LINKS.signIn} />;
    }
    return <Route {...rest} />;
  };
  return <>{renderComponent()}</>;
}

export default ProtectedRoute;
