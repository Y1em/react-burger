import {
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  OPEN_ORDER,
} from "../actions/order-api";
import { TOrderActions } from "../actions/order-api";

type TOrderApiState = {
  name: string;
  number: number;
  orderRequest: boolean;
  orderFailed: boolean;
  open: boolean;
};

export const InitialState = {
  name: "",
  number: 0,
  orderRequest: false,
  orderFailed: false,
  open: false,
};

export const orderApiReducer = (
  state: TOrderApiState = InitialState,
  action: TOrderActions
): TOrderApiState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        number: action.number,
        name: action.name,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    }
    case OPEN_ORDER: {
      return {
        ...state,
        open: action.open,
        number: 0,
      };
    }
    default: {
      return state;
    }
  }
};
