import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";


export const ProtectedRouteElement = ({ element, path }) => {
  const accessToken = useSelector((store) => store.authReducer.accessToken);
  return (
    Boolean(accessToken) ? element : <Navigate to={path} replace />
  )
}
