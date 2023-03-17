import style from "./order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { dateFormat, getStatus, findItems, totalPrice, getQuantity, getOneBunArr } from "../utils/utils";
import { ingredients } from "../utils/data";
import PropTypes from "prop-types";

const Order = ({ obj }) => {
  const burgerArr = findItems(obj.ingredients, ingredients);

  return (
    <section className={`${style.container}`}>
      <h2 className={`${style.number} mb-10 text text_type_digits-default`}>
        {`#${obj.number}`}
      </h2>
      <h2 className={`text text_type_main-medium mb-3 ${style.name}`} >
        {obj.name}
      </h2>
      <p className={obj.status === "done" ? `text text_type_main-default mb-15 ${style.status_done}` : `text text_type_main-default mb-15`} >
        {getStatus(obj.status)}
      </p>
      <p className={`text text_type_main-medium mb-6`}>
        Состав:
      </p>
      <ul className={`${style.ingredients}`} >
        {
          getOneBunArr(burgerArr).map((item, index) => {
            return (
              <li className={`${style.ingredient} mb-4`} key={index} >
                <img
                  className={`${style.image}`}
                  alt={item.name}
                  src={item.image_mobile}
                />
                <p className={`${style.ingredient__name} text text_type_main-default ml-4`} >
                  {item.name}
                </p>
                <div className={`${style.priceinfo} text text_type_digits-default`} >

                  <p className="mr-2" >
                    {`${getQuantity(item, burgerArr)} x ${item.price}`}
                  </p>
                  <CurrencyIcon />
                </div>
              </li>
            )
          })
        }
      </ul>
      <div className={`${style.bottom} mt-6`}>
        <p className={`${style.time} text text_type_main-default`}>
          {dateFormat(obj.createdAt)}
        </p>
        <div className={style.price} >
          <p className="text text_type_digits-default mr-2" >
            {totalPrice(burgerArr)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>

    </section>
  );
};

export { Order };

Order.propTypes = {
  obj: PropTypes.object.isRequired
};
