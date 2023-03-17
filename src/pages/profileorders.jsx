import Style from "./profileorders.module.css";
import { FeedItem } from "../components/feed-item/feed-item";
import { useSelector } from "react-redux";
import { reverseArr } from "../components/utils/utils";
import { Outlet } from "react-router-dom";

function ProfileOrders() {

  const data = useSelector(((store) => store.wsReducer.userData));

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
