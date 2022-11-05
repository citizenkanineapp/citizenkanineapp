import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from '../../AllPages/Login/LoginPage/LoginPage';
import {useSelector} from 'react-redux';

function ProtectedRoute({ component, children, ...props }) {
  const user = useSelector((store) => store.user);

  // Component may be passed in as a "component" prop,
  // or as a child component.
  const ProtectedComponent = component || (() => children);

  return (
    <Route {...props}>
      {user.id ?
        // If the user is logged in, show the protected component
        <ProtectedComponent />
        :
        // Otherwise, redirect to the Loginpage
        <LoginPage />
      }
    </Route>
  );
}

export default ProtectedRoute;
