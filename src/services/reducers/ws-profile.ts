import {
  WS_PROFILE_ERROR,
  WS_PROFILE_SUCCESS,
  WS_GET_USER_ORDERS,
  WS_PROFILE_CLOSE,
  WS_PROFILE_RECONNECT,
} from "../actions/ws-profile";
import { TWsProfileActions } from "../actions/ws-profile";
import { TwsResponse } from "../../utils/types";

type TWsState = {
  wsConnected: boolean;
  userData: TwsResponse | undefined;
  wsTokenError: boolean
};

export const initialState = {
  wsConnected: false,
  userData: undefined,
  wsTokenError: false
};

export const wsProfileReducer = (
  state: TWsState = initialState,
  action: TWsProfileActions
): TWsState => {
  switch (action.type) {
    case WS_PROFILE_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsTokenError: false
      };

    case WS_PROFILE_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_USER_ORDERS:
      return {
        ...state,
        userData: action.payload,
      };

    case WS_PROFILE_CLOSE:
      return {
        ...state,
        wsConnected: false,
        userData: undefined,
      };

      case WS_PROFILE_RECONNECT:
        return {
          ...state,
          wsTokenError: true
        }
    default:
      return state;
  }
};
