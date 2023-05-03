import {
  CLOSE_MODAL,
  OPEN_MODAL,
} from "../actions/modal";
import { TModalActions } from "../actions/modal";

type TModalState = {
  isOpen: boolean;
};

export const InitialState = {
  isOpen: false,
};

export const modalReducer = (
  state: TModalState = InitialState,
  action: TModalActions
): TModalState => {
  switch (action.type) {

    case CLOSE_MODAL: {
      return {
        ...state,
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
