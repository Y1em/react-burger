import React, { FunctionComponent } from "react";
import style from "./orderpage.module.css";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import { getOrder, shortToken } from "../utils/utils";
import { useLocation } from "react-router-dom";
import { Order } from "../components/order/order";
import { WS_FEED_CLOSE, WS_FEED_START } from "../services/actions/ws-feed";
import { TOrderPageProps } from "../utils/types";
import { feedPath } from "../utils/const";
import { WS_PROFILE_CLOSE, WS_PROFILE_START } from "../services/actions/ws-profile";
import { Loader } from "../components/loading/loading";

const OrderPage: FunctionComponent<TOrderPageProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const allOrders = useAppSelector((store) => store.wsFeedReducer.data?.orders);
  const userOrders = useAppSelector((store) => store.wsProfileReducer.userData?.orders);
  let item = undefined;
  const accessToken = localStorage.getItem("accessToken");
  const userOrdersRequest = accessToken ? `?token=${shortToken(accessToken.toString())}` : "";
  const from = location.state;
  const isFeed = location.pathname.slice(0, 5) === feedPath;

  if (allOrders) {
    item = getOrder(id, allOrders)
  } else if (userOrders) {
    item = getOrder(id, userOrders)
  }

  React.useEffect(
    () => {
      if (isFeed && !allOrders) {
        dispatch({
          type: WS_FEED_START,
          payload: "/all",
        });

        return () => {
          dispatch({
            type: WS_FEED_CLOSE
          })
        }
      }
    },
    [] // eslint-disable-line
  );

  React.useEffect(
    () => {
      if (!isFeed && !userOrders) {
        dispatch({
          type: WS_PROFILE_START,
          payload: userOrdersRequest,
        });

        return () => {
          dispatch({
            type: WS_PROFILE_CLOSE
          })
        }
      }
    },
    [] // eslint-disable-line
  );

  if (item) {
    return (
      <div className={style.container}>
        {from === null && <div className={"mb-30"} />}
        <Order obj={item} />
      </div>
    );
  } else {
    return (
      <div className={style.container}>
        <div className="mb-30"/>
        <Loader />
      </div>
    )

  }
};

export { OrderPage };
