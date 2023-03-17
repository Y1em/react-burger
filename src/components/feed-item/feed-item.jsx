import { useDispatch } from "react-redux";
import style from "./feed-item.module.css";
import {
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { feedPath, ordersPath } from "../utils/const";
import { findItems, dateFormat, totalPrice, getStatus, getOneBunArr } from "../utils/utils";
import { ingredients } from "../utils/data";
import { SET_CURRENT_ORDER } from "../../services/actions/modal";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const FeedItem = ({ order, type }) => {

  const burgerArr = findItems(order.ingredients, ingredients);
  const oneBunBurgerArr = getOneBunArr(burgerArr);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation().pathname

  const goToOrder = () => {
    if (path === feedPath) {
      navigate(`/feed/${order._id}`, { replace: true, state: path });
    } else if (path === ordersPath) {
      navigate(`/profile/orders/${order._id}`, { replace: true, state: path });
    }
  }

  function onItemClick() {
    dispatch({
      type: SET_CURRENT_ORDER,
      order: order
    });
    goToOrder();
  }

  return (
    <div
      className={type === 'orders' ? `${style.card} ${style.card_wide} p-6` : `${style.card} p-6`}
      onClick={onItemClick}
    >
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
          <p className={order.status === "done" ? `text text_type_main-default mt-2 ${style.status_done}` : `text text_type_main-default mt-2`} >
            {getStatus(order.status)}
          </p>
        )
      }
      <div className={`${style.bottom} mt-6`}>
        <div className={style.images}>
          {
            oneBunBurgerArr.map((item, index) => { // eslint-disable-line
              if (index < 5) {
                return (
                  <img
                    src={item.image_mobile}
                    key={`${item._id}-${index}`}
                    className={style.image}
                    style={{zIndex:100 - 2*index}}
                    alt={item.name}
                  />
                )
              } else if (index === 5) {
                return (
                  <div
                    className={`${style.last}`}
                    key={`${item._id}-${index}`}
                  >
                    <img
                      src={item.image_mobile}
                      className={`${style.image}`}
                      style={{zIndex:100 - 2*index}}
                      alt={item.name}
                    />
                    {oneBunBurgerArr.length > 6 &&
                    <div
                      className={`text text_type_main-default ${style.cover}`}
                      style={{zIndex:100 - 2*index + 1}}>
                        {`+${oneBunBurgerArr.length - 5}`}
                    </div>}
                  </div>
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

FeedItem.propTypes = {
  order: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};
