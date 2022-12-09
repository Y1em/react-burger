import React from "react";
import burgerConstructor from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { ConstructorContainer } from "../constructor-container/constructor-container";
import { OrderDetails } from "../order-datails/order-datails";
import { getIds } from "../utils/utils";
import { initialMessage, emptyOrderMessage } from "../utils/const";
import { getOrderData } from "../../services/actions/order-api";
import { useDispatch, useSelector } from "react-redux";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const bunList = useSelector((store) => store.constructorReducer.constructorBuns);
  const mainList = useSelector((store) => store.constructorReducer.constructorMains);
  const totalPrice = useSelector((store) => store.constructorReducer.totalPrice);
  const number = useSelector((store) => store.orderApiReducer.order.number);
  const [message, setMesaage] = React.useState(initialMessage);

  function onButtonClick() {
    if (bunList.length === 0) {
      setMesaage(emptyOrderMessage);
    } else {
      dispatch(getOrderData(getIds(bunList.concat(mainList))));
    }
  }

  function handleSetMessage(string) {
    setMesaage(string);
  }

  return (
    <section className={`pt-25 pl-4 ${burgerConstructor.section} `}>
      <ConstructorContainer
        mainList={mainList}
        bunList={bunList}
        message={message}
        handleSetMessage={handleSetMessage}
      />
      <div className={`mr-4 mt-10 ${burgerConstructor.bottom}`}>
        <p className={"text text_type_digits-medium mr-2"}>{totalPrice}</p>
        <div className={`mr-10 ${burgerConstructor.icon}`}>
          <CurrencyIcon />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={onButtonClick}
        >
          Оформить заказ
        </Button>
      </div>
      {number > 0 && (
        <Modal title={"..."}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
