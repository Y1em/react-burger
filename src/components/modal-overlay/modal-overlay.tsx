import React, { FunctionComponent } from "react";
import modalOverlay from "./modal-overlay.module.css";
import { TModalOverlayProps } from "../utils/types";

const ModalOverlay: FunctionComponent<TModalOverlayProps> = ({
  children,
  handleClose,
}) => {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  React.useEffect(() => {
    function closeByLayover(e: MouseEvent) {
      if (e.target === ref.current) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", closeByLayover);
    return () => {
      document.removeEventListener("mousedown", closeByLayover);
    };
  }, [handleClose]);

  return (
    <section
      className={`overlay ${modalOverlay.section}`}
      tabIndex={0}
      ref={ref}
    >
      {children}
    </section>
  );
};

export { ModalOverlay };
