import { FunctionComponent } from "react";
import modal from "./order-datails.module.css";
import done from "../../images/graphics.svg";
import { Loader } from "../loading/loading";
import { useAppSelector } from "../../services/hooks/hooks";

const OrderDetails: FunctionComponent = () => {

  const order = useAppSelector((store) => store.orderApiReducer);

  function getTitle(number: number) {
    if (number > 0) {
      return number;
    } else {
      return <Loader />;
    }
  }

  return (
    <div className={`${modal.container}`}>
      <div className={`mb-8 text text_type_digits-large ${modal.number}`}>{getTitle(order.number)}</div>
      <p className="mb-15 text text_type_main-medium">идентификатор заказа</p>
      <img src={done} alt="Готово" className={`mb-15 ${modal.image}`} />
      <p className="mb-2 text text_type_main-default">
        Ваш заказ начали готовить
      </p>
      <p className={`text text_type_main-default ${modal.text}`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export { OrderDetails };
