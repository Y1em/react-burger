import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../services/hooks/hooks";
import React, { FunctionComponent } from "react";
import { TProtectedRoutesProps } from "../utils/types";

export const ProtectedRouteElement: FunctionComponent<
  TProtectedRoutesProps
> = ({ element, path, isAuthorized }) => {
  const location = useLocation();
  const user = useAppSelector((store) => store.authReducer.name);
  function isAuth() {
    return Boolean(localStorage.getItem("accessToken"));
  }

  React.useEffect(() => {
    isAuth();
  }, [user]); // eslint-disable-line

  if (isAuthorized) {
    return isAuth() ? <Navigate to={path} /> : element;
  } else {
    return isAuth() ? (
      element
    ) : (
      <Navigate to={path} replace state={{ from: location }} />
    );
  }
};
