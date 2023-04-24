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
  reLoginTrigger,
} from "../utils/const";
import IngredientPage from "../../pages/ingredient";
import { useAppSelector, useAppDispatch } from "../../services/hooks/hooks";
import { HomePage } from "../../pages/homepage";
import { NotFoundPage } from "../../pages/notfound";
import { userLogin } from "../../services/actions/auth";
import { update, getObj, getString } from "../utils/utils";
import { getUser } from "../utils/api";
import { WS_CONNECTION_CLOSE } from "../../services/actions/ws-actions";
import { TResponse } from "../utils/types";

const App: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const accessToken = getString("accessToken");
  const refreshToken = getString("refreshToken");
  const password = getString("password");
  const currentItem = useAppSelector((store) => store.modalReducer.currentItem);
  const savedCurrentItem = getObj("currentItem");
  const currentOrder = useAppSelector(
    (store) => store.modalReducer.currentOrder
  );
  const savedCurrentOrder = getObj("currentOrder");

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
    if (accessToken && refreshToken) {
      reLogin(accessToken, refreshToken);
    }
  }, []); // eslint-disable-line

  React.useEffect(() => {
    if (
      location.pathname.slice(0, 5) !== feedPath &&
      location.pathname.slice(0, 15) !== ordersPath
    ) {
      dispatch({
        type: WS_CONNECTION_CLOSE,
      });
    }
  }, [location.pathname]); // eslint-disable-line

  return (
    <Routes>
      <Route path={homePath} element={<HomePage />}>
        {currentItem || savedCurrentItem ? (
          <Route path={ingredientPath} element={<IngredientPage />} />
        ) : (
          ""
        )}
      </Route>
      <Route path={ingredientPath} element={<IngredientPage />} />
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
        <Route path={ordersPath} element={<ProfileOrders />}>
          {currentOrder || savedCurrentOrder ? (
            <Route path={orderPath} element={<OrderPage />} />
          ) : (
            ""
          )}
        </Route>
      </Route>
      <Route path={orderPath} element={<OrderPage />} />

      <Route path={feedPath} element={<FeedPage />}>
        {currentOrder || savedCurrentOrder ? (
          <Route path={orderFeedPath} element={<OrderPage />} />
        ) : (
          ""
        )}
      </Route>
      <Route path={orderFeedPath} element={<OrderPage />} />

      <Route path={wrongPath} element={<NotFoundPage />} />
    </Routes>
  );
};
export default App;
