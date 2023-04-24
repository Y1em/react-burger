import { getData } from "../../components/utils/api";
import { TIngredientArr } from "../../components/utils/types.js";
import { AppDispatch, AppThunk } from "../../components/utils/types";

export const GET_ITEMS_REQUEST: "GET_ITEMS_REQUEST" = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS: "GET_ITEMS_SUCCESS" = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED: "GET_ITEMS_FAILED" = "GET_ITEMS_FAILED";

export type TGetItiemsAction = {
  readonly type: typeof GET_ITEMS_REQUEST;
};

export type TGetItiemsFailedAction = {
  readonly type: typeof GET_ITEMS_FAILED;
};

export type TGetItiemsSuccessAction = {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: TIngredientArr;
};

export type TItemsActions =
  | TGetItiemsAction
  | TGetItiemsFailedAction
  | TGetItiemsSuccessAction;

export const getItemsAction = (): TGetItiemsAction => ({
  type: GET_ITEMS_REQUEST,
});

export const getItemsFailedAction = (): TGetItiemsFailedAction => ({
  type: GET_ITEMS_FAILED,
});

export const getItiemsSuccessAction = (
  items: TIngredientArr
): TGetItiemsSuccessAction => ({
  type: GET_ITEMS_SUCCESS,
  items,
});

export function getItems(): AppThunk {
  return async (dispatch: AppDispatch) => {
    dispatch(getItemsAction());
    getData()
      .then((res) => {
        if (res && res.success) {
          dispatch(getItiemsSuccessAction(res.data));
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
