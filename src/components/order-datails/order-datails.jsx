import React from "react";
import PropTypes from "prop-types";
import PortalReactDOM from 'react-dom';
import modal from './order-datails.module.css';
import { modalRoot } from "../utils/utils";
import {
  CloseIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import done from "../../images/graphics.svg";

const OrderDetails = ({ toModalOrder }) => {

  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current.focus()
  }, []);

  function handleClose() {
    toModalOrder()
  }

  function handleCloseByEscape(e) {
    if (e.key === "Escape") {
      toModalOrder();
    }
  }

  function handleCloseByOverlay(e) {
    if (e.target === ref.current) {
      toModalOrder();
    }
  }

  return PortalReactDOM.createPortal(
    (
      <section className={`${modal.section}`} onClick={handleCloseByOverlay} onKeyDown={handleCloseByEscape} tabIndex={0} ref={ref} >
        <div className={`pt-30 pr-25 pb-30 pl-25 ${modal.container}`} >
          <p className={`mb-8 text text_type_digits-large ${modal.number}`}>374568</p>
          <div className={`${modal.close}`}>
            <CloseIcon onClick={handleClose} />
          </div>
          <p className="mb-15 text text_type_main-medium">идентификатор заказа</p>
          <img
            src={done}
            alt='Готово'
            className={`mb-15 ${modal.image}`}
          />
          <p className="mb-2 text text_type_main-default">Ваш заказ начали готовить</p>
          <p className={`text text_type_main-default ${modal.text}`}>Дождитесь готовности на орбитальной станции</p>
        </div>

      </section>
    ),
    modalRoot
  );
}

export { OrderDetails };

OrderDetails.propTypes = {
  toModalOrder: PropTypes.func,
};
