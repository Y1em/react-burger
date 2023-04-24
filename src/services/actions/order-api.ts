import { getOrder } from "../../components/utils/api";
import { AppDispatch, AppThunk } from "../../components/utils/types";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const OPEN_ORDER: "OPEN_ORDER" = "OPEN_ORDER";

export type TGetOrderRequestAction = {
  readonly type: typeof GET_ORDER_REQUEST;
};

export type TGetOrderSuccessAction = {
  readonly type: typeof GET_ORDER_SUCCESS;
  name: string;
  number: number;
};

export type TGetOrderFailedAction = {
  readonly type: typeof GET_ORDER_FAILED;
};

export type TOpenOrderAction = {
  readonly open: boolean;
  readonly type: typeof OPEN_ORDER;
};

export type TOrderActions =
  | TGetOrderRequestAction
  | TGetOrderSuccessAction
  | TGetOrderFailedAction
  | TOpenOrderAction;

export const getOrderRequestAction = (): TGetOrderRequestAction => ({
  type: GET_ORDER_REQUEST,
});

export const getOrderSuccessAction = (
  name: string,
  number: number
): TGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  name,
  number,
});

export const getOrderFailedAction = (): TGetOrderFailedAction => ({
  type: GET_ORDER_FAILED,
});

export function getOrderData(ids: string[], token: string): AppThunk {
  return async (dispatch: AppDispatch) => {
    dispatch(getOrderRequestAction());
    getOrder(ids, token)
      .then((res) => {
        if (res && res.success) {
          dispatch(getOrderSuccessAction(res.name, res.order.number));
        } else {
          dispatch(getOrderFailedAction());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
