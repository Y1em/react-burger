import { TwsResponse } from "../../utils/types";

export const WS_PROFILE_START: "WS_PROFILE_START" = "WS_PROFILE_START";
export const WS_PROFILE_SUCCESS: "WS_PROFILE_SUCCESS" =
  "WS_PROFILE_SUCCESS";
export const WS_PROFILE_ERROR: "WS_PROFILE_ERROR" = "WS_PROFILE_ERROR";
export const WS_GET_USER_ORDERS: "WS_GET_USER_ORDERS" = "WS_GET_USER_ORDERS";
export const WS_PROFILE_CLOSE: "WS_PROFILE_CLOSE" = "WS_PROFILE_CLOSE";
export const WS_PROFILE_RECONNECT: "WS_PROFILE_RECONNECT" = "WS_PROFILE_RECONNECT";

export type TWsProfileStartAction = {
  readonly type: typeof WS_PROFILE_START;
  readonly payload: string;
};

export type TWsProfileSuccessAction = {
  readonly type: typeof WS_PROFILE_SUCCESS;
};

export type TWsProfileErrorAction = {
  readonly type: typeof WS_PROFILE_ERROR;
};

export type TWsGetUserOrdersAction = {
  readonly payload: TwsResponse;
  readonly type: typeof WS_GET_USER_ORDERS;
};

export type TWsProfileCloseAction = {
  readonly type: typeof WS_PROFILE_CLOSE;
};

export type TWsProfileReconnectAction = {
  readonly type: typeof WS_PROFILE_RECONNECT;
  readonly payload: string;
}

export type TWsProfileActions =
  | TWsProfileStartAction
  | TWsProfileSuccessAction
  | TWsProfileErrorAction
  | TWsGetUserOrdersAction
  | TWsProfileCloseAction
  | TWsProfileReconnectAction;

