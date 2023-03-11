import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ProfilePage from "../../pages/profile";
import ResetPasswordPage from "../../pages/reset-password";
import OrdersPage from "../../pages/orders";
import { ProtectedRouteElement } from "../protected-route";
import {
  loginPath,
  homePath,
  registerPath,
  resetPath,
  forgotPath,
  profilePath,
  wrongPath,
  ingredientPath,
  ordersPath
} from "../utils/const";
import IngredientPage from "../../pages/ingredient";
import { useSelector } from "react-redux";
import { HomePage } from "../../pages/homepage";
import { NotFoundPage } from '../../pages/notfound';
import { update } from '../utils/utils';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../services/actions/auth';
import { getUser, updateToken } from '../utils/api';

function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const currentItem = useSelector((store) => store.modalReducer.currentItem);
  const savedCurrentItem = JSON.parse(localStorage.getItem('currentItem'));

  function login(res) {
    dispatch(userLogin(res.user.email, localStorage.getItem('password')));
  }

  async function reLogin() {
    await getUser(accessToken, update(updateToken, refreshToken, getUser, login))
    .then((res) => {
      if (res && res.success) {
        login(res)
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  React.useEffect(() => {
    if (accessToken) {
      reLogin();
    }
  }, []); // eslint-disable-line

  return (
    <Routes>
      <Route path={homePath} element={<HomePage />}>
        {currentItem || savedCurrentItem ? <Route path={ingredientPath} element={<IngredientPage />}/> : ''}
      </Route>
      <Route path={ingredientPath} element={<IngredientPage />}/>
      <Route
        path={loginPath}
        element={
          <ProtectedRouteElement
            element={<LoginPage />}
            path={(location.state && location.state !== homePath) ? location.state.from.pathname : homePath}
            isAuthorized={true}
          />
        }
      />
      <Route path={registerPath} element={<ProtectedRouteElement element={<RegisterPage />} path={homePath} isAuthorized={true} />} />
      <Route path={forgotPath} element={<ProtectedRouteElement element={<ForgotPasswordPage />} path={homePath} isAuthorized={true} />} />
      <Route path={resetPath} element={<ProtectedRouteElement element={<ResetPasswordPage />} path={homePath} isAuthorized={true} />} />
      <Route path={profilePath} element={<ProtectedRouteElement element={<ProfilePage />} path={loginPath} isAuthorized={false} />} />
      <Route path={ordersPath} element={<ProtectedRouteElement element={<OrdersPage />} path={loginPath} isAuthorized={false} />} />
      <Route path={wrongPath} element={<NotFoundPage />} />
    </Routes>
  );
}
export default App;
