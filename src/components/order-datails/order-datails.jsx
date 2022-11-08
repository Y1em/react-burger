import PropTypes from "prop-types";
import modal from './order-datails.module.css';
import done from "../../images/graphics.svg";
import { ModalOverlay } from "../modal-overlay/modal-overlay";

const Order = () => {
  return (
    <div className={`${modal.container}`}>
      <p className="mb-15 text text_type_main-medium">идентификатор заказа</p>
      <img
        src={done}
        alt='Готово'
        className={`mb-15 ${modal.image}`}
      />
      <p className="mb-2 text text_type_main-default">Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default ${modal.text}`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

const order = Order();

const OrderDetails = ( {closePopup} ) => {
  return (
    <ModalOverlay Popup={order} type={'number'} handleClose={closePopup} />
  );
}

export { OrderDetails };

OrderDetails.propTypes = {
  toModalOrder: PropTypes.func,
};
