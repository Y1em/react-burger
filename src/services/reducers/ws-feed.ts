import {
  WS_FEED_ERROR,
  WS_FEED_SUCCESS,
  WS_GET_ORDERS,
  WS_FEED_CLOSE,
} from "../actions/ws-feed";
import { TWsFeedActions } from "../actions/ws-feed";
import { TwsResponse } from "../../utils/types";

type TWsState = {
  wsConnected: boolean;
  data: TwsResponse | undefined;
};

export const initialState = {
  wsConnected: false,
  data: undefined,
};

export const wsFeedReducer = (
  state: TWsState = initialState,
  action: TWsFeedActions
): TWsState => {
  switch (action.type) {
    case WS_FEED_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_FEED_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        data: action.payload,
      };

    case WS_FEED_CLOSE:
      return {
        ...state,
        data: undefined,
        wsConnected: false,
      };
    default:
      return state;
  }
};
