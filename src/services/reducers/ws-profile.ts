import {
  WS_PROFILE_CLOSED,
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
  wsTokenError: string | undefined
};

export const initialState = {
  wsConnected: false,
  userData: undefined,
  wsTokenError: undefined
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
      };

    case WS_PROFILE_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_PROFILE_CLOSED:
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
        userData: undefined,
      };

      case WS_PROFILE_RECONNECT:
        return {
          ...state,
          wsTokenError: action.payload
        }
    default:
      return state;
  }
};
