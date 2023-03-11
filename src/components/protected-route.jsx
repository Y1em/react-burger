import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';

export const ProtectedRouteElement = ({ element, path, isAuthorized }) => {
  const location = useLocation();
  const user = useSelector((store) => store.authReducer.name);
  function isAuth() {
    return Boolean(localStorage.getItem('accessToken'))
  }

  React.useEffect(() => {
    isAuth()
  }, [user]); // eslint-disable-line

  if (isAuthorized) {
    return (
      isAuth() ? <Navigate to={path} /> : element
    );
  } else {
    return (
      isAuth() ? element : <Navigate to={path} replace state={{from: location}}/>
    )
  }
}
