import React from "react";
import PropTypes from "prop-types";
import PortalReactDOM from 'react-dom';
import modalOverlay from './modal-overlay.module.css';
import { modalRoot } from "../utils/utils";
import { Modal } from "../modal/modal";

const ModalOverlay = ({Popup, type, handleClose}) => {

  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current.focus();

  }, []);

  React.useEffect(()=>{
    document.addEventListener("mousedown", (e) => {
      if (e.target === ref.current) {
        handleClose();
      }
    });
    return () => {
      document.removeEventListener("mousedown", (e) => {
        if (e.target === ref.current) {
          handleClose();
        }
      });
    }
  }, [handleClose])

  return PortalReactDOM.createPortal(
    (
      <section className={`${modalOverlay.section}`} tabIndex={0} ref={ref} >
        <Modal Popup={Popup} type={type} handleClose={handleClose} />
      </section>
    ),
    modalRoot
  );
}

export { ModalOverlay }

ModalOverlay.propTypes = {
  Popup: PropTypes.element,
  type: PropTypes.string,
  handleClose: PropTypes.func,
};
