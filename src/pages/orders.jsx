import React from "react";
import Style from "./orders.module.css";
import AppHeader from "../components/app-header/app-header";
import { useDispatch } from "react-redux";
import { ACTIVE } from "../services/actions/app-header";

function OrdersPage() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: ACTIVE,
      active: window.location.pathname,
    });
  }, []); // eslint-disable-line

  return (
    <div>
      <AppHeader />
      <p className={`${Style.text} text text_type_main-medium m-20`}>
        Данная страница будет реализована во второй части проекта
      </p>
    </div>
  );
}

export default OrdersPage;
