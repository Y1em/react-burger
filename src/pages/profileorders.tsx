import React, { FunctionComponent } from "react";
import Style from "./profileorders.module.css";
import { FeedItem } from "../components/feed-item/feed-item";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import { getObj, reverseArr, shortToken } from "../utils/utils";
import { Outlet } from "react-router-dom";
import { WS_PROFILE_CLOSE, WS_PROFILE_START } from "../services/actions/ws-profile";

const ProfileOrders: FunctionComponent = () => {
  const data = useAppSelector((store) => store.wsProfileReducer.userData);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const userOrdersRequest = accessToken ? `?token=${shortToken(accessToken.toString())}` : "";
  const ingredients = useAppSelector((store) => store.ingredientsApiReducer.items);
  const savedData = getObj("ingredients");
  const isWsError = useAppSelector((store) => store.wsProfileReducer.wsTokenError);

  React.useEffect(() => {
    if (!savedData) {
      localStorage.setItem("ingredients", JSON.stringify(ingredients));
    }
  }, [savedData]); // eslint-disable-line

  React.useEffect(
    () => {
      dispatch({
        type: WS_PROFILE_START,
        payload: userOrdersRequest,
      });

      return () => {
        dispatch({
          type: WS_PROFILE_CLOSE
        })
      }
    },
    [isWsError, accessToken, dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (data?.orders) {
    return (
      <div className={`${Style.orders} ml-10 mt-9 p-2`}>
        {reverseArr(data.orders).map((item) => {
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
