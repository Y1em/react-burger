import React, { FunctionComponent } from "react";
import Style from "./profileorders.module.css";
import { FeedItem } from "../components/feed-item/feed-item";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import { reverseArr, shortToken } from "../utils/utils";
import { WS_PROFILE_CLOSE, WS_PROFILE_START } from "../services/actions/ws-profile";
import { useLocation } from "react-router-dom";
import { Loader } from "../components/loading/loading";

const ProfileOrders: FunctionComponent = () => {
  const data = useAppSelector((store) => store.wsProfileReducer.userData);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const userOrdersRequest = accessToken ? `?token=${shortToken(accessToken.toString())}` : "";
  const isWsError = useAppSelector((store) => store.wsProfileReducer.wsTokenError);
  const location = useLocation();

  React.useEffect(
    () => {
      if (location) {
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
    [isWsError] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <>
      {data?.orders ? (
      <div className={`${Style.orders} ml-10 mt-9 p-2`}>
        {reverseArr(data.orders).map((item) => {
          return <FeedItem order={item} type="orders" key={item._id} />;
        })}
      </div>
      ) : (
        <div className={Style.loader}>
          <Loader />
        </div>
      )}
    </>
  );
};

export { ProfileOrders };
