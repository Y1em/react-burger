import React from "react";
import PropTypes from "prop-types";
import modal from './modal.module.css';
import {
  CloseIcon
} from "@ya.praktikum/react-developer-burger-ui-components";


const Modal = ({Popup, type, handleClose}) => {

  React.useEffect(()=>{
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    });
    return () => {
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          handleClose();
        }
      });
    }
  }, [handleClose])

  const paddingStyle = (type) => {
    if (type === 'number') {
      return `pt-30 pr-25 pb-30 pl-25 ${modal.container}`
    } else {
      return `pt-10 pr-10 pb-15 pl-10 ${modal.container}`
    }
  }

  const style = paddingStyle(type)

  function handleCloseByButton() {
    handleClose()
  }

  return (
    <div className={style} >
      {type === 'number' ? <h2 className={`mb-8 text text_type_digits-large ${modal.number}`}>374568</h2> : <h2 className={`text text_type_main-large ${modal.text}`}>Детали ингредиента</h2>}
      <div className={`${modal.close}`}>
        <CloseIcon onClick={handleCloseByButton} />
      </div>
      {Popup}
    </div>
  )
}

export { Modal }

Modal.propTypes = {
  Popup: PropTypes.element,
  type: PropTypes.string,
  handleClose: PropTypes.func,
};


