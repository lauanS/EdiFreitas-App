import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RestrictedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            localStorage.getItem("authToken") ?
                <Redirect to="/admin" />
            : <Component {...props} />
        )} />
    );
};

export default RestrictedRoute;