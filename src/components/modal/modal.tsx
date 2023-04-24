import React, { FunctionComponent, UIEvent } from "react";
import PortalReactDOM from "react-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import modal from "./modal.module.css";
import { modalRoot } from "../utils/const";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { ingredientsTitle } from "../utils/const";
import { CLOSE_MODAL } from "../../services/actions/modal";
import { useNavigate, useLocation } from "react-router-dom";
import { DELETE_ITEMS } from "../../services/actions/burger-constructor";
import {
  DELETE_ACTIVE_BUN,
  RESET_COUNTER,
} from "../../services/actions/burger-ingredients";
import { OPEN_ORDER } from "../../services/actions/order-api";
import { Loader } from "../loading/loading";
import { TModalProps } from "../utils/types";

const Modal: FunctionComponent<TModalProps> = ({ children, title }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const order = useAppSelector((store) => store.orderApiReducer);
  const data = useAppSelector((store) => store.ingredientsApiReducer.items);

  const handleClose = React.useCallback<() => void>(
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
          type: RESET_COUNTER,
          items: data,
        });
        dispatch({
          type: OPEN_ORDER,
          open: false,
        });
      }
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
  let titleStyle: string = "";
  const styleTitle = (string: string | undefined) => {
    if (string === ingredientsTitle) {
      containerStyle = `pt-10 pr-10 pb-15 pl-10`;
      titleStyle = `text text_type_main-large ${modal.text}`;
    } else {
      containerStyle = `pt-30 pr-25 pb-30 pl-25`;
      titleStyle = `mb-8 text text_type_digits-large ${modal.number}`;
    }
  };

  styleTitle(title);

  function getTitle(string: string, number: number) {
    if (string === ingredientsTitle) {
      return string;
    } else {
      if (number > 0) {
        return number;
      } else {
        return <Loader />;
      }
    }
  }

  if (modalRoot) {
    return PortalReactDOM.createPortal(
      <ModalOverlay handleClose={handleClose}>
        <div className={`${containerStyle} ${modal.container}`}>
          {title ? (
            <div className={titleStyle}>{getTitle(title, order.number)}</div>
          ) : (
            ""
          )}
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
