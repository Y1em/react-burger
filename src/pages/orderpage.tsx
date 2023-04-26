import React, { FunctionComponent } from "react";
import style from "./orderpage.module.css";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import AppHeader from "../components/app-header/app-header";
import { getOrder } from "../components/utils/utils";
import { Modal } from "../components/modal/modal";
import { useParams, useLocation } from "react-router-dom";
import { Order } from "../components/order/order";
import { WS_CONNECTION_START } from "../services/actions/ws-actions";
import { getObj } from "../components/utils/utils";
import { TOrder } from "../components/utils/types";

const OrderPage: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const currentOrder = useAppSelector(
    (store) => store.modalReducer.currentOrder
  );
  const savedCurrentOrder = getObj("currentOrder");
  const { id } = useParams();
  const orders = useAppSelector((store) => store.wsReducer.data?.orders);
  const [item, setItem] = React.useState<TOrder | undefined>(undefined);
  const from = useLocation().state;

  React.useEffect(
    () => {
      if (from === null) {
        dispatch({
          type: WS_CONNECTION_START,
          payload: "/all",
        });
      }
    },
    [] // eslint-disable-line
  );

  React.useEffect(() => {
    if (from === null && orders) {
      setItem(getOrder(id, orders));
    }
  }, [orders]); // eslint-disable-line

  if (from === null && item) {
    return (
      <div>
        <AppHeader />
        <div className={`${style.container} mt-30`}>
          <Order obj={item} />
        </div>
      </div>
    );
  } else {
    return (
      (currentOrder || savedCurrentOrder) && (
        <Modal>
          <Order obj={currentOrder ? currentOrder : savedCurrentOrder} />
        </Modal>
      )
    );
  }
};

export { OrderPage };
