import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_GET_USER_ORDERS,
  WS_CONNECTION_CLOSE,
} from "../actions/ws-actions";
import { TWsActions } from "../actions/ws-actions";
import { TwsResponse } from "../../components/utils/types";

type TWsState = {
  wsConnected: boolean;
  data: TwsResponse | undefined;
  userData: TwsResponse | undefined;
};

export const initialState = {
  wsConnected: false,
  data: undefined,
  userData: undefined,
};

export const wsReducer = (
  state: TWsState = initialState,
  action: TWsActions
): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        data: action.payload,
      };

    case WS_GET_USER_ORDERS:
      return {
        ...state,
        userData: action.payload,
      };

    case WS_CONNECTION_CLOSE:
      return {
        ...state,
        data: undefined,
        userData: undefined,
      };
    default:
      return state;
  }
};
