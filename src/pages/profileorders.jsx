import React from "react";
import Style from "./profileorders.module.css";
import { FeedItem } from "../components/feed-item/feed-item";
import { useSelector, useDispatch } from "react-redux";
import { reverseArr } from "../components/utils/utils";
import { Outlet } from "react-router-dom";
import { WS_CONNECTION_START } from "../services/actions/ws-actions";

function ProfileOrders() {

  const dispatch = useDispatch();
  const data = useSelector(((store) => store.wsReducer.userData));

  React.useEffect(
    () => {
      dispatch({
        type: WS_CONNECTION_START,
        request: "allUserOrders",
       });
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (data.orders) {
    return (
      <div className={`${Style.orders} ml-10 mt-9 p-2`}>
        {
          reverseArr(data.orders).map((item) => {
            return (
              <FeedItem
                order={item}
                type="orders"
                key={item._id}
              />
            )
          })
        }
        <Outlet />
      </div>
    );
  }
}

export { ProfileOrders };
