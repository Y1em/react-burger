import React from "react";
import PropTypes from "prop-types";
import PortalReactDOM from 'react-dom';
import modal from './modal.module.css';
import { modalRoot } from "../utils/utils";
import {
  CloseIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";


const Modal = ({ children, title, handleClose}) => {

  React.useEffect(()=>{
    function closeByEscape(e) {
      if(e.key === "Escape") {
        handleClose();
      }
    }
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    }
  }, []);

  function handleCloseByButton() {
    handleClose()
  };

  let containerStyle = '';
  let titleStyle = '';
  const isNan = (string) => {
    if (!(parseInt(string))) {
      containerStyle = `pt-10 pr-10 pb-15 pl-10 ${modal.container}`;
      titleStyle = `text text_type_main-large ${modal.text}`;
    } else {
      containerStyle = `pt-30 pr-25 pb-30 pl-25 ${modal.container}`;
      titleStyle = `mb-8 text text_type_digits-large ${modal.number}`;
    }
  }

  isNan(title);

  return PortalReactDOM.createPortal(
    (
      <ModalOverlay handleClose={handleClose}>
        <div className={containerStyle} >
          <div className={titleStyle} >
            {title}
          </div>
          <div className={`${modal.close}`}>
            <CloseIcon onClick={handleCloseByButton} />
          </div>
          {children}
        </div>
      </ModalOverlay>
    ),
    modalRoot
  )
}

export { Modal }

Modal.propTypes = {
  title: PropTypes.string,
  handleClose: PropTypes.func,
};
