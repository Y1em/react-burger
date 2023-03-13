import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemPropTypes } from "../utils/types";
import style from "./feed-item.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { findItems, dateFormat, totalPrice, deleteBun, cutArr } from "../utils/utils";
import { ingredients } from "../utils/data";

const FeedItem = ({ order, type }) => {

  const ws = new WebSocket("wss://norma.nomoreparties.space/orders/all");
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
  };

  const burgerArr = findItems(order.ingredients, ingredients);
  const oneBunBurgerArr = deleteBun(burgerArr);

  function getStatus(string) {
    if (string === "done") {
      return "Выполнен"
    }
  }

  return (
    <div className={type === 'orders' ? `${style.card} ${style.card_wide} p-6` : `${style.card} p-6`}>
      <div className={`${style.info} mb-6`}>
        <p className="text text_type_digits-default">
          {`#${order.number}`}
        </p>
        <p className={`${style.time} text text_type_main-default`}>
          {dateFormat(order.createdAt)}
        </p>
      </div>
      <p className={`text text_type_main-medium ${style.name}`}>
        {order.name}
      </p>
      {
        (type === 'orders') && (
          <p className={`text text_type_main-default mt-2`}>
            {getStatus(order.status)}
          </p>
        )
      }
      <div className={`${style.bottom} mt-6`}>

        <div className={style.images}>
          {
            oneBunBurgerArr.map((item, index) => {
              if (index < 5) {
                return <img src={item.image_mobile} key={`${item._id}-${index}`} className={style.image} style={{zIndex:100 - 2*index}} />
              } else if (index === 5) {
                return (
                <>
                  <img src={item.image_mobile} key={`${item._id}-${index}`} className={`${style.image} ${style.image_last}`} style={{zIndex:100 - 2*index}} />
                  {oneBunBurgerArr.length > 6 && <div className={`text text_type_main-default ${style.cover}`} style={{zIndex:100 - 2*index + 1}}>
                    {`+${oneBunBurgerArr.length - 5}`}
                  </div>}
                </>

                )
              }
            })
          }
        </div>

        <div className={style.price}>
          <p className="text text_type_digits-default mr-2">
            {totalPrice(burgerArr)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export { FeedItem }
