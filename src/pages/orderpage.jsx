import React from "react";
import style from "./orderpage.module.css";
import { useSelector, useDispatch } from "react-redux";
import AppHeader from "../components/app-header/app-header";
import { getItem } from "../components/utils/utils";
import { Modal } from "../components/modal/modal";
import { useParams, useLocation } from 'react-router-dom';
import { Order } from "../components/order/order";
import { WS_CONNECTION_START } from "../services/actions/ws-actions";

function OrderPage() {

  const dispatch = useDispatch();
  const currentOrder = useSelector((store) => store.modalReducer.currentOrder);
  const savedCurrentOrder = JSON.parse(localStorage.getItem('currentOrder'));
  const {id} = useParams();
  const orders = useSelector((store) => store.wsReducer.data.orders);
  const [item, setItem] = React.useState('');
  const from = useLocation().state;

  React.useEffect(
    () => {
      if (from === null) {
        dispatch({
          type: WS_CONNECTION_START,
          request: "allOrders",
         });
      }
    },
    [] // eslint-disable-line
  );

  React.useEffect(() => {
    if (from === null && orders) {
      setItem(getItem(id, orders));
    }
  }, [orders]); // eslint-disable-line

  if (from === null && item) {
    return (
      <div>
        <AppHeader />
        <div className={`${style.container} mt-30`} >
          <Order obj={item} />
        </div>
      </div>
    )
  } else {
    return (
      (currentOrder || savedCurrentOrder) && (
        <Modal>
          <Order obj={currentOrder ? currentOrder : savedCurrentOrder} />
        </Modal>
      )
    );
  }
}

export { OrderPage };
