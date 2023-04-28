import { TwsResponse } from "../../utils/types";

export const WS_FEED_START: "WS_FEED_START" = "WS_FEED_START";
export const WS_FEED_SUCCESS: "WS_FEED_SUCCESS" =
  "WS_FEED_SUCCESS";
export const WS_FEED_ERROR: "WS_FEED_ERROR" = "WS_FEED_ERROR";
export const WS_FEED_CLOSED: "WS_FEED_CLOSED" =
  "WS_FEED_CLOSED";
export const WS_GET_ORDERS: "WS_GET_ORDERS" = "WS_GET_ORDERS";
export const WS_FEED_CLOSE: "WS_FEED_CLOSE" = "WS_FEED_CLOSE";

export type TWsFeedStartAction = {
  readonly type: typeof WS_FEED_START;
  readonly payload: string;
};

export type TWsFeedSuccessAction = {
  readonly type: typeof WS_FEED_SUCCESS;
};

export type TWsFeedErrorAction = {
  readonly type: typeof WS_FEED_ERROR;
};

export type TWsFeedClosedAction = {
  readonly type: typeof WS_FEED_CLOSED;
};

export type TWsGetOrdersAction = {
  readonly payload: TwsResponse;
  readonly type: typeof WS_GET_ORDERS;
};

export type TWsFeedCloseAction = {
  readonly type: typeof WS_FEED_CLOSE;
};

export type TWsFeedActions =
  | TWsFeedStartAction
  | TWsFeedSuccessAction
  | TWsFeedErrorAction
  | TWsFeedClosedAction
  | TWsGetOrdersAction
  | TWsFeedCloseAction;
