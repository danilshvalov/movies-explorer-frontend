import React, {useContext} from 'react';
/* -------------------------------- Generics -------------------------------- */
import ProtectedRoute, {
  Props as ProtectedRouteProps,
} from '@generic/ProtectedRoute/ProtectedRoute';
/* -------------------------------- Contexts -------------------------------- */
import CurrentUserContext from '@contexts/CurrentUserContext';
/* ---------------------------------- Utils --------------------------------- */
import {PAGE_LINKS} from '@utils/config';
/* -------------------------------------------------------------------------- */

export type Props = Omit<ProtectedRouteProps, 'redirectTo' | 'condition'>;

export function AuthorizedRoute(props: Props): JSX.Element {
  const currentUser = useContext(CurrentUserContext);

  return (
    <ProtectedRoute
      {...props}
      condition={currentUser.loggedIn ?? false}
      redirectTo={PAGE_LINKS.main}
    />
  );
}

export default AuthorizedRoute;
