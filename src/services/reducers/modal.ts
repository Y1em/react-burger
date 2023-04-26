import {
  SET_CURRENT_ITEM,
  CLOSE_MODAL,
  SET_CURRENT_ORDER,
  OPEN_MODAL,
} from "../actions/modal";
import { TModalActions } from "../actions/modal";
import { TIngredient, TOrder } from "../../components/utils/types";
import { getObj } from "../../components/utils/utils";

type TModalState = {
  currentItem: TIngredient | null;
  currentOrder: TOrder | null;
  isOpen: boolean;
};

export const InitialState = {
  currentItem: null,
  currentOrder: null,
  isOpen: false,
};

export const modalReducer = (
  state: TModalState = InitialState,
  action: TModalActions
): TModalState => {
  switch (action.type) {
    case SET_CURRENT_ITEM: {
      localStorage.setItem(
        "currentItem",
        JSON.stringify(
          action.items.find((item) => (item._id === action.id ? item : null))
        )
      );
      return {
        ...state,
        currentItem: getObj("currentItem"),
      };
    }

    case SET_CURRENT_ORDER: {
      localStorage.setItem("currentOrder", JSON.stringify(action.order));
      return {
        ...state,
        currentOrder: getObj("currentOrder"),
      };
    }

    case CLOSE_MODAL: {
      localStorage.removeItem("currentItem");
      localStorage.removeItem("currentOrder");
      return {
        ...state,
        currentItem: null,
        currentOrder: null,
        isOpen: false,
      };
    }

    case OPEN_MODAL: {
      return {
        ...state,
        isOpen: true,
      };
    }

    default: {
      return state;
    }
  }
};
