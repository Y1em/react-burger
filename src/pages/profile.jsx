import React from "react";
import Style from "./profile.module.css";
import AppHeader from "../components/app-header/app-header";
import { useDispatch } from "react-redux";
import { userLogout } from "../services/actions/auth";
import { ACTIVE } from "../services/actions/app-header";
import { WS_CONNECTION_START } from "../services/actions/ws-actions";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ordersPath, profilePath } from "../components/utils/const";
import { getPath, getActiveTab } from "../components/utils/utils";

function ProfilePage() {

  const dispatch = useDispatch();
  const location = useLocation();
  const activePath = getPath(location.pathname);
  const activeTab = getActiveTab(location.pathname);
  const refreshToken = localStorage.getItem('refreshToken');
  const [active, setActive] = React.useState(activeTab);

  React.useEffect(
    () => {
      dispatch({
        type: WS_CONNECTION_START,
        request: "allUserOrders",
       });
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  function onItemClick(e) {
    setActive(e.target.attributes.value.value);
  }

  function onLogoutClick(e) {
    onItemClick(e);
    if (refreshToken) {
      dispatch(userLogout(refreshToken));
    }
  }

  React.useEffect(() => {
    dispatch({
      type: ACTIVE,
      active: activePath,
    });
  }, []); // eslint-disable-line

  function getProfileDescription(string) {
    if (string === "profile") {
      return "В этом разделе вы можете изменить\u00A0свои персональные данные"
    } else if (string === "orders") {
      return "В этом разделе вы можете просмотреть свою историю заказов"
    }
  }

  return (
    <main>
      <AppHeader />
        <div className={Style.container} >
          <ul className={Style.list} >
            <Link to={profilePath} className={Style.link} >
              <li
                className={active === "profile" ? `${Style.item} ${Style.item_active} text text_type_main-medium` : `${Style.item} text text_type_main-medium` }
                value="profile"
                onClick={onItemClick}
              >
                Профиль
              </li>
            </Link>
            <Link to ={ordersPath} className={Style.link} >
              <li
                className={active === "orders" ? `${Style.item} ${Style.item_active} text text_type_main-medium` : `${Style.item} text text_type_main-medium` }
                value="orders"
                onClick={onItemClick}
              >
                История заказов
              </li>
            </Link>
            <li
              className={active === "exit" ? `${Style.item} ${Style.item_active} text text_type_main-medium mb-20` : `${Style.item} text text_type_main-medium mb-20`}
              onClick={onLogoutClick}
              value="exit"
            >
              Выход
            </li>

            <li className={`${Style.text} text text_type_main-default`} >
              {getProfileDescription(active)}
            </li>
          </ul>
          <Outlet />
        </div>
    </main>
  );
}

export default ProfilePage;
