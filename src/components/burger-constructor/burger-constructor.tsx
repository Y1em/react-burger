import React, { FunctionComponent } from "react";
import burgerConstructor from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { ConstructorContainer } from "../constructor-container/constructor-container";
import { OrderDetails } from "../order-datails/order-datails";
import { getIds } from "../utils/utils";
import { initialMessage, emptyOrderMessage, loginPath } from "../utils/const";
import { getOrderData } from "../../services/actions/order-api";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { Navigate } from "react-router-dom";
import { OPEN_ORDER } from "../../services/actions/order-api";
import { DELETE_ITEMS } from "../../services/actions/burger-constructor";
import { OPEN_MODAL } from "../../services/actions/modal";
import { RESET_COUNTER, DELETE_ACTIVE_BUN } from "../../services/actions/burger-ingredients";

const BurgerConstructor: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const bunList = useAppSelector(
    (store) => store.constructorReducer.constructorBuns
  );
  const mainList = useAppSelector(
    (store) => store.constructorReducer.constructorMains
  );
  const totalPrice = useAppSelector(
    (store) => store.constructorReducer.totalPrice
  );
  const [message, setMessage] = React.useState<string>(initialMessage);
  const open = useAppSelector((store) => store.orderApiReducer.open);
  const [isRedirect, setRedirect] = React.useState<boolean>(false);
  const accessToken = localStorage.getItem("accessToken");
  const modalIsOpen = useAppSelector((store) => store.modalReducer.isOpen);
  const data = useAppSelector((store) => store.ingredientsApiReducer.items);

  React.useEffect(
    () => {
      if (!modalIsOpen) {
        dispatch({
          type: OPEN_ORDER,
          open: false,
        });
      }
    },
    [modalIsOpen] // eslint-disable-line
  );

  function onButtonClick() {
    if (!accessToken) {
      setRedirect(true);
    } else {
      setRedirect(false);
      if (bunList.length === 0) {
        setMessage(emptyOrderMessage);
      } else {
        dispatch({
          type: OPEN_ORDER,
          open: true,
        });
        dispatch({
          type: OPEN_MODAL,
          isOpen: true,
        });
        dispatch({
          type: DELETE_ITEMS,
        });
        dispatch({
          type: RESET_COUNTER,
          items: data,
        });
        dispatch({
          type: DELETE_ACTIVE_BUN,
        });
        dispatch(getOrderData(getIds(bunList.concat(mainList)), accessToken));
      }
    }
  }

  function handleSetMessage(string: string) {
    setMessage(string);
  }

  if (isRedirect) {
    return <Navigate to={loginPath} />;
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
          <CurrencyIcon type={"primary"} />
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
      {open && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export { BurgerConstructor };
