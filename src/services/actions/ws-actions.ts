import { TwsResponse } from "../../components/utils/types";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_ORDERS: "WS_GET_ORDERS" = "WS_GET_ORDERS";
export const WS_GET_USER_ORDERS: "WS_GET_USER_ORDERS" = "WS_GET_USER_ORDERS";
export const WS_CONNECTION_CLOSE: "WS_CONNECTION_CLOSE" = "WS_CONNECTION_CLOSE";

export type TWsConnectionStartAction = {
  readonly type: typeof WS_CONNECTION_START;
};

export type TWsConnectionSuccessAction = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
};

export type TWsConnectionErrorAction = {
  readonly type: typeof WS_CONNECTION_ERROR;
};

export type TWsConnectionClosedAction = {
  readonly type: typeof WS_CONNECTION_CLOSED;
};

export type TWsGetOrdersAction = {
  readonly payload: TwsResponse;
  readonly type: typeof WS_GET_ORDERS;
};

export type TWsGetUserOrdersAction = {
  readonly payload: TwsResponse;
  readonly type: typeof WS_GET_USER_ORDERS;
};

export type TWsConnectionCloseAction = {
  readonly type: typeof WS_CONNECTION_CLOSE;
};

export type TWsActions =
  | TWsConnectionStartAction
  | TWsConnectionSuccessAction
  | TWsConnectionErrorAction
  | TWsConnectionClosedAction
  | TWsGetOrdersAction
  | TWsGetUserOrdersAction
  | TWsConnectionCloseAction;
