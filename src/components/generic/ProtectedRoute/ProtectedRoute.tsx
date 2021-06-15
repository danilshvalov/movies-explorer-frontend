import React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';

export interface FunctionalProps {
  condition: boolean;
  redirectTo: string;
}
export type Props = RouteProps & FunctionalProps;

export function ProtectedRoute({condition, redirectTo, ...rest}: Props): JSX.Element {
  const renderComponent = () => {
    if (!condition) {
      return <Redirect to={redirectTo} />;
    }
    return <Route {...rest} />;
  };
  return <>{renderComponent()}</>;
}

export default ProtectedRoute;
