import React from "react";
import variables from "./app.module.css"; // eslint-disable-line
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ProfilePage from "../../pages/profile";
import ResetPasswordPage from "../../pages/reset-password";
import FeedPage from "../../pages/feed";
import { ProtectedRouteElement } from "../protected-route";
import { ProfileForm } from "../../pages/profileform";
import { ProfileOrders } from "../../pages/profileorders";
import { OrderPage } from "../../pages/orderpage";
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
  orderPath,
  feedPath,
  orderFeedPath,
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
import { WS_CONNECTION_CLOSE } from "../../services/actions/ws-actions";

function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const currentItem = useSelector((store) => store.modalReducer.currentItem);
  const savedCurrentItem = JSON.parse(localStorage.getItem('currentItem'));
  const currentOrder = useSelector((store) => store.modalReducer.currentOrder);
  const savedCurrentOrder = JSON.parse(localStorage.getItem('currentOrder'));

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

  React.useEffect(() => {
    if (location.pathname.slice(0, 5) !== feedPath && location.pathname.slice(0, 15) !== ordersPath) {
      dispatch({
        type: WS_CONNECTION_CLOSE,
       });
    }
  }, [location.pathname]); // eslint-disable-line

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
            path={location.state?.from ? location.state.from.pathname : homePath}
            isAuthorized={true}
          />
        }
      />
      <Route path={registerPath} element={<ProtectedRouteElement element={<RegisterPage />} path={homePath} isAuthorized={true} />} />
      <Route path={forgotPath} element={<ProtectedRouteElement element={<ForgotPasswordPage />} path={homePath} isAuthorized={true} />} />
      <Route path={resetPath} element={<ProtectedRouteElement element={<ResetPasswordPage />} path={homePath} isAuthorized={true} />} />

      <Route path={profilePath} element={<ProtectedRouteElement element={<ProfilePage />} path={loginPath} isAuthorized={false} />}>
        <Route index element={<ProfileForm />}/>
        <Route path={ordersPath} element={<ProfileOrders />}>
          {currentOrder || savedCurrentOrder ? <Route path={orderPath} element={<OrderPage />}/> : ''}
        </Route>
      </Route>
      <Route path={orderPath} element={<OrderPage />}/>

      <Route path={feedPath} element={<FeedPage />} >
        {currentOrder || savedCurrentOrder ? <Route path={orderFeedPath} element={<OrderPage />}/> : ''}
      </Route>
      <Route path={orderFeedPath} element={<OrderPage />}/>

      <Route path={wrongPath} element={<NotFoundPage />} />
    </Routes>
  );
}
export default App;
