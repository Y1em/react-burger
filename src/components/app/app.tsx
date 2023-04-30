import React, { FunctionComponent } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
} from "../../utils/const";
import IngredientPage from "../../pages/ingredient";
import { useAppSelector, useAppDispatch } from "../../services/hooks/hooks";
import { HomePage } from "../../pages/homepage";
import { NotFoundPage } from "../../pages/notfound";
import { userLogin } from "../../services/actions/auth";
import { update, getString, getId } from "../../utils/utils";
import { getUser } from "../../utils/api";
import { TResponse } from "../../utils/types";
import { Modal } from "../modal/modal";
import { getItems } from "../../services/actions/ingredients-api";
import AppHeader from "../app-header/app-header";

const App: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const accessToken = getString("accessToken");
  const refreshToken = getString("refreshToken");
  const password = getString("password");
  const isWsError = useAppSelector((store) => store.wsProfileReducer.wsTokenError);
  const background = location.state?.background;
  const id = getId(location.pathname);

  function login(res: TResponse) {
    if (password) {
      dispatch(userLogin(res.user.email, password));
    }
  }

  function reLogin(acToken: string, refToken: string) {
    getUser(acToken, update, refToken, reLoginTrigger, reLogin)
      .then((res) => {
        if (res && res.success) {
          login(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
      dispatch(getItems());
  }, []); // eslint-disable-line

  React.useEffect(() => {
    if (accessToken && refreshToken) {
      reLogin(accessToken, refreshToken);
    }
  }, [isWsError, accessToken, refreshToken]); // eslint-disable-line

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path={homePath} element={<HomePage />} />
        <Route path={ingredientPath} element={<IngredientPage id={id} />} />
        <Route
          path={loginPath}
          element={
            <ProtectedRouteElement
              element={<LoginPage />}
              path={
                location.state?.from ? location.state.from.pathname : homePath
              }
              isAuthorized={true}
            />
          }
        />
        <Route
          path={registerPath}
          element={
            <ProtectedRouteElement
              element={<RegisterPage />}
              path={homePath}
              isAuthorized={true}
            />
          }
        />
        <Route
          path={forgotPath}
          element={
            <ProtectedRouteElement
              element={<ForgotPasswordPage />}
              path={homePath}
              isAuthorized={true}
            />
          }
        />
        <Route
          path={resetPath}
          element={
            <ProtectedRouteElement
              element={<ResetPasswordPage />}
              path={homePath}
              isAuthorized={true}
            />
          }
        />

        <Route
          path={profilePath}
          element={
            <ProtectedRouteElement
              element={<ProfilePage />}
              path={loginPath}
              isAuthorized={false}
            />
          }
        >
          <Route index element={<ProfileForm />} />
          <Route path={ordersPath} element={<ProfileOrders />} />
        </Route>
        <Route path={orderPath} element={<OrderPage id={id} />} />
        <Route path={feedPath} element={<FeedPage />} />
        <Route path={orderFeedPath} element={<OrderPage id={id} />} />
        <Route path={wrongPath} element={<NotFoundPage />} />
      </Routes>

      {background?.pathname === homePath && (
        <Modal>
          <IngredientPage id={id} />
        </Modal>
      )}

      {background?.pathname === feedPath && (
        <Modal>
          <OrderPage id={id} />
        </Modal>
      )}

      {background?.pathname === ordersPath && (
        <Modal>
          <OrderPage id={id} />
        </Modal>
      )}
      </>

  );
};
export default App;
