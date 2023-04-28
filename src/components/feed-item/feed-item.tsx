import { FunctionComponent } from "react";
import style from "./feed-item.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  findItems,
  dateFormat,
  totalPrice,
  getStatus,
  getOneBunArr,
} from "../../utils/utils";
import { useLocation, Link } from "react-router-dom";
import { getObj } from "../../utils/utils";
import { TFeedItemProps } from "../../utils/types";

const FeedItem: FunctionComponent<TFeedItemProps> = ({ order, type }) => {
  const ingredients = getObj("ingredients");
  const burgerArr = findItems(order.ingredients, ingredients);
  const oneBunBurgerArr = getOneBunArr(burgerArr);
  const location = useLocation();
  const path = useLocation().pathname;

  return (
    <Link
      className={
        type === "orders"
          ? `${style.card} ${style.card_wide} p-6`
          : `${style.card} p-6`
      }
      to={{pathname: `${path}/${order._id}`}}
      state={{ background: location }}
    >
      <div className={`${style.info} mb-6`}>
        <p className="text text_type_digits-default">{`#${order.number}`}</p>
        <p className={`${style.time} text text_type_main-default`}>
          {dateFormat(order.createdAt)}
        </p>
      </div>
      <p className={`text text_type_main-medium ${style.name}`}>{order.name}</p>
      {type === "orders" && (
        <p
          className={
            order.status === "done"
              ? `text text_type_main-default mt-2 ${style.status_done}`
              : `text text_type_main-default mt-2`
          }
        >
          {getStatus(order.status)}
        </p>
      )}
      <div className={`${style.bottom} mt-6`}>
        <div className={style.images}>
          {oneBunBurgerArr.map((item, index) => { // eslint-disable-line
            if (index < 5) {
              return (
                <img
                  src={item.image_mobile}
                  key={`${item._id}-${index}`}
                  className={style.image}
                  style={{ zIndex: 100 - 2 * index }}
                  alt={item.name}
                />
              );
            } else if (index === 5) {
              return (
                <div className={`${style.last}`} key={`${item._id}-${index}`}>
                  <img
                    src={item.image_mobile}
                    className={`${style.image}`}
                    style={{ zIndex: 100 - 2 * index }}
                    alt={item.name}
                  />
                  {oneBunBurgerArr.length > 6 && (
                    <div
                      className={`text text_type_main-default ${style.cover}`}
                      style={{ zIndex: 100 - 2 * index + 1 }}
                    >
                      {`+${oneBunBurgerArr.length - 5}`}
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
        <div className={style.price}>
          <p className="text text_type_digits-default mr-2">
            {totalPrice(burgerArr)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};

export { FeedItem };
