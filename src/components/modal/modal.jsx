import React from "react";
import PropTypes from "prop-types";
import PortalReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import modal from "./modal.module.css";
import { modalRoot } from "../utils/const";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { ingredientsTitle } from "../utils/const";
import { CLOSE_MODAL } from "../../services/actions/modal";
import { useNavigate, useLocation } from 'react-router-dom';
import { DELETE_ITEMS } from "../../services/actions/burger-constructor";
import { DELETE_ACTIVE_BUN, SET_COUNT } from "../../services/actions/burger-ingredients";
import { OPEN_ORDER } from "../../services/actions/order-api";
import { Loader } from "../loading/loading";

const Modal = ({ children, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const order = useSelector(store => store.orderApiReducer.order);
  const data = useSelector((store) => store.ingredientsApiReducer.items);

  const handleClose = React.useCallback(
    () => {
      navigate(location.state, { replace: true });
      dispatch({
        type: CLOSE_MODAL,
        order: order,
      });
      if (location.state === null) {
        dispatch({
          type: DELETE_ITEMS,
        });
        dispatch({
          type: DELETE_ACTIVE_BUN,
        });
        dispatch({
          type: SET_COUNT,
          items: data,
        });
        dispatch({
          type: OPEN_ORDER,
          open: false,
        });
      }
    }, [dispatch] // eslint-disable-line
  )

  React.useEffect(() => {
    function closeByEscape(e) {
      if (e.key === "Escape") {
        handleClose();
      }
    }
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [handleClose]);

  function handleCloseByButton() {
    handleClose();
  }

  let containerStyle = "";
  let titleStyle = "";
  const styleTitle = (string) => {
    if (string === ingredientsTitle) {
      containerStyle = `pt-10 pr-10 pb-15 pl-10`;
      titleStyle = `text text_type_main-large ${modal.text}`;
    } else {
      containerStyle = `pt-30 pr-25 pb-30 pl-25`;
      titleStyle = `mb-8 text text_type_digits-large ${modal.number}`;
    }
  };

  styleTitle(title);

  function getTitle(string, number) {
    if (string === ingredientsTitle) {
      return string
    } else {
      if (number > 0) {
        return number
      } else {
        return <Loader />
      }
    }
  }

  return PortalReactDOM.createPortal(
    <ModalOverlay handleClose={handleClose}>
      <div className={`${containerStyle} ${modal.container}`}>
        {title ?
          <div className={titleStyle}>
            {getTitle(title, order.number)}
          </div> :
          ""
        }
        <div className={`${modal.close}`}>
          <CloseIcon onClick={handleCloseByButton} />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export { Modal };

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
};
