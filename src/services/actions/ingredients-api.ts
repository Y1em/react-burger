import { getData } from "../../utils/api";
import { TIngredientArr } from "../../utils/types.js";
import { AppThunk } from "../../utils/types";

export const GET_ITEMS_REQUEST: "GET_ITEMS_REQUEST" = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS: "GET_ITEMS_SUCCESS" = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED: "GET_ITEMS_FAILED" = "GET_ITEMS_FAILED";

export type TGetItemsAction = {
  readonly type: typeof GET_ITEMS_REQUEST;
};

export type TGetItemsFailedAction = {
  readonly type: typeof GET_ITEMS_FAILED;
};

export type TGetItemsSuccessAction = {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: TIngredientArr;
};

export type TItemsActions =
  | TGetItemsAction
  | TGetItemsFailedAction
  | TGetItemsSuccessAction;

export const getItemsAction = (): TGetItemsAction => ({
  type: GET_ITEMS_REQUEST,
});

export const getItemsFailedAction = (): TGetItemsFailedAction => ({
  type: GET_ITEMS_FAILED,
});

export const getItemsSuccessAction = (
  items: TIngredientArr
): TGetItemsSuccessAction => ({
  type: GET_ITEMS_SUCCESS,
  items,
});

export function getItems(): AppThunk {
  return async (dispatch) => {
    dispatch(getItemsAction());
    getData()
      .then((res) => {
        if (res && res.success) {
          dispatch(getItemsSuccessAction(res.data));
          localStorage.setItem("ingredients", JSON.stringify(res.data));
        } else {
          dispatch(getItemsFailedAction());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
