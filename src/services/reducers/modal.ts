import {
  SET_CURRENT_ITEM,
  CLOSE_MODAL,
  SET_CURRENT_ORDER,
} from "../actions/modal";
import { TModalActions } from "../actions/modal";
import { TIngredient, TOrder } from "../../components/utils/types";
import { getObj } from "../../components/utils/utils";

type TModalState = {
  currentItem: TIngredient | null;
  currentOrder: TOrder | null;
};

export const InitialState = {
  currentItem: null,
  currentOrder: null,
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
      };
    }

    default: {
      return state;
    }
  }
};
