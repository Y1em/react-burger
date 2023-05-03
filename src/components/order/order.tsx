import { FunctionComponent } from "react";
import style from "./order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  dateFormat,
  getStatus,
  findItems,
  totalPrice,
  getQuantity,
  getUniqStringArr,
} from "../../utils/utils";
import { TorderModalProps } from "../../utils/types";
import { useAppSelector } from "../../services/hooks/hooks";

const Order: FunctionComponent<TorderModalProps> = ({ obj }) => {
  const ingredients = useAppSelector((store) => store.ingredientsApiReducer.items);
  const burgerArr = findItems(obj.ingredients, ingredients);
  const burgerUniqArr = findItems(getUniqStringArr(obj.ingredients), ingredients);

  return (
    <section className={`${style.container}`}>
      <h2 className={`${style.number} mb-10 text text_type_digits-default`}>
        {`#${obj.number}`}
      </h2>
      <h2 className={`text text_type_main-medium mb-3 ${style.name}`}>
        {obj.name}
      </h2>
      <p
        className={
          obj.status === "done"
            ? `text text_type_main-default mb-15 ${style.status_done}`
            : `text text_type_main-default mb-15`
        }
      >
        {getStatus(obj.status)}
      </p>
      <p className={`text text_type_main-medium mb-6`}>Состав:</p>
      <ul className={`${style.ingredients}`}>
        {burgerUniqArr.map((item, index) => {
          return (
            <li className={`${style.ingredient} mb-4`} key={index}>
              <img
                className={`${style.image}`}
                alt={item.name}
                src={item.image_mobile}
              />
              <p
                className={`${style.ingredient__name} text text_type_main-default ml-4`}
              >
                {item.name}
              </p>
              <div
                className={`${style.priceinfo} text text_type_digits-default`}
              >
                <p className="mr-2">
                  {`${getQuantity(item, burgerArr)} x ${item.price}`}
                </p>
                <CurrencyIcon type={"primary"} />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={`${style.bottom} mt-6`}>
        <p className={`${style.time} text text_type_main-default`}>
          {dateFormat(obj.createdAt)}
        </p>
        <div className={style.price}>
          <p className="text text_type_digits-default mr-2">
            {totalPrice(burgerArr)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
};

export { Order };
