import React, { FunctionComponent } from "react";
import PortalReactDOM from "react-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import modal from "./modal.module.css";
import { modalRoot } from "../utils/const";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { CLOSE_MODAL } from "../../services/actions/modal";
import { useNavigate, useLocation } from "react-router-dom";
import { TModalProps } from "../utils/types";

const Modal: FunctionComponent<TModalProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentItem = useAppSelector((store) => store.modalReducer.currentItem);

  const handleClose = React.useCallback<() => void>(
    () => {
      navigate(location.state, { replace: true });
      dispatch({
        type: CLOSE_MODAL,
      });
    },
    [dispatch] // eslint-disable-line
  );

  React.useEffect(() => {
    function closeByEscape(e: KeyboardEvent) {
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

  let containerStyle: string = "";
  const styleTitle = () => {
    if (currentItem) {
      containerStyle = `pt-10 pr-10 pb-15 pl-10`;
    } else {
      containerStyle = `pt-30 pr-25 pb-30 pl-25`;
    }
  };

  styleTitle();

  if (modalRoot) {
    return PortalReactDOM.createPortal(
      <ModalOverlay handleClose={handleClose}>
        <div className={`${containerStyle} ${modal.container}`}>
          <div className={`${modal.close}`}>
            <CloseIcon type={"primary"} onClick={handleCloseByButton} />
          </div>
          {children}
        </div>
      </ModalOverlay>,
      modalRoot
    );
  } else {
    return <></>;
  }
};

export { Modal };
