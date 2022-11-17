import React from "react";
import PropTypes from "prop-types";
import PortalReactDOM from "react-dom";
import modal from "./modal.module.css";
import { modalRoot } from "../utils/const";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { ingredientsTitle } from "../utils/const";
import { orderContext } from "../../services/appContext";

const Modal = ({ children, title, handleClose }) => {
  const { order } = React.useContext(orderContext);

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

  return PortalReactDOM.createPortal(
    <ModalOverlay handleClose={handleClose}>
      <div className={`${containerStyle} ${modal.container}`}>
        <div className={titleStyle}>
          {title === ingredientsTitle ? title : order.number}
        </div>
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
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
