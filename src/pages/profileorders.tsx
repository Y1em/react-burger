import React, { FunctionComponent } from "react";
import Style from "./profileorders.module.css";
import { FeedItem } from "../components/feed-item/feed-item";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import { reverseArr } from "../components/utils/utils";
import { Outlet } from "react-router-dom";
import { WS_CONNECTION_START } from "../services/actions/ws-actions";
import { TOrder } from "../components/utils/types";
import { shortToken } from "../components/utils/utils";

const ProfileOrders: FunctionComponent = () => {
  const data = useAppSelector((store) => store.wsReducer.userData);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const userOrdersRequest = accessToken ? `?token=${shortToken(accessToken.toString())}` : "";


  React.useEffect(
    () => {
      dispatch({
        type: WS_CONNECTION_START,
        payload: userOrdersRequest,
      });
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (data?.orders) {
    return (
      <div className={`${Style.orders} ml-10 mt-9 p-2`}>
        {reverseArr(data.orders).map((item: TOrder) => {
          return <FeedItem order={item} type="orders" key={item._id} />;
        })}
        <Outlet />
      </div>
    );
  } else {
    return <></>;
  }
};

export { ProfileOrders };
