import React from "react";
import variables from "./app.module.css";
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ProfilePage from "../../pages/profile";
import ResetPasswordPage from "../../pages/reset-password";
import OrdersPage from "../../pages/orders";
import FeedPage from "../../pages/feed";
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
  ordersPath,
  feedPath,
  reLoginTrigger
} from "../utils/const";
import IngredientPage from "../../pages/ingredient";
import { useSelector } from "react-redux";
import { HomePage } from "../../pages/homepage";
import { NotFoundPage } from '../../pages/notfound';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../services/actions/auth';
import { update } from "../utils/utils";
import { getUser } from "../utils/api";

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

  function reLogin(acToken, refToken) {
    getUser(acToken, update, refToken, reLoginTrigger, reLogin)
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
      reLogin(accessToken, refreshToken);
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
      <Route path={feedPath} element={<ProtectedRouteElement element={<FeedPage />} path={loginPath} isAuthorized={false} />} />
      <Route path={wrongPath} element={<NotFoundPage />} />
    </Routes>
  );
}
export default App;
