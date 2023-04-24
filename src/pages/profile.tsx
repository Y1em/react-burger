import React, { FunctionComponent } from "react";
import Style from "./profile.module.css";
import AppHeader from "../components/app-header/app-header";
import { useAppDispatch } from "../services/hooks/hooks";
import { userLogout } from "../services/actions/auth";
import { ACTIVE } from "../services/actions/app-header";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ordersPath, profilePath } from "../components/utils/const";
import { getActiveTab } from "../components/utils/utils";

const ProfilePage: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const activeTab = getActiveTab(location.pathname);
  const refreshToken = localStorage.getItem("refreshToken");
  const [active, setActive] = React.useState(activeTab);

  function onItemClick(e: any) {
    setActive(e.target.attributes.value.value);
  }

  function onLogoutClick(e: any) {
    onItemClick(e);
    if (refreshToken) {
      dispatch(userLogout(refreshToken));
    }
  }

  React.useEffect(() => {
    dispatch({
      type: ACTIVE,
      active: window.location.pathname,
    });
  }, []); // eslint-disable-line

  function getProfileDescription(string: string) {
    if (string === "profile") {
      return "В этом разделе вы можете изменить\u00A0свои персональные данные";
    } else if (string === "orders") {
      return "В этом разделе вы можете просмотреть свою историю заказов";
    }
  }

  return (
    <main>
      <AppHeader />
      <div className={Style.container}>
        <ul className={Style.list}>
          <Link to={profilePath} className={Style.link}>
            <li
              className={
                active === "profile"
                  ? `${Style.item} ${Style.item_active} text text_type_main-medium`
                  : `${Style.item} text text_type_main-medium`
              }
              value="profile"
              onClick={onItemClick}
            >
              Профиль
            </li>
          </Link>
          <Link to={ordersPath} className={Style.link}>
            <li
              className={
                active === "orders"
                  ? `${Style.item} ${Style.item_active} text text_type_main-medium`
                  : `${Style.item} text text_type_main-medium`
              }
              value="orders"
              onClick={onItemClick}
            >
              История заказов
            </li>
          </Link>
          <li
            className={
              active === "exit"
                ? `${Style.item} ${Style.item_active} text text_type_main-medium mb-20`
                : `${Style.item} text text_type_main-medium mb-20`
            }
            onClick={onLogoutClick}
            value="exit"
          >
            Выход
          </li>

          <li className={`${Style.text} text text_type_main-default`}>
            {getProfileDescription(active)}
          </li>
        </ul>
        <Outlet />
      </div>
    </main>
  );
};

export default ProfilePage;
