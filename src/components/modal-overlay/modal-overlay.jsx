import React from "react";
import PropTypes from "prop-types";
import modalOverlay from './modal-overlay.module.css';


const ModalOverlay = ({children, handleClose}) => {

  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current.focus();

  }, []);

  React.useEffect(()=>{
    function closeByLayover(e) {
      if(e.target === ref.current) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", closeByLayover);
    return () => {
      document.removeEventListener("mousedown", closeByLayover);
    }
  }, [])

  return (
      <section className={`${modalOverlay.section}`} tabIndex={0} ref={ref} >
        {children}
      </section>
  );
}

export { ModalOverlay }

ModalOverlay.propTypes = {
  handleClose: PropTypes.func,
};
