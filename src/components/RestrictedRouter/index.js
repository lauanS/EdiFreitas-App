import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isAuth} from '../../services/auth'

const RestrictedRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      isAuth() ?
        <Redirect to="/admin" />
      : <Component {...props} />
    )} />
  );
};

export default RestrictedRoute;