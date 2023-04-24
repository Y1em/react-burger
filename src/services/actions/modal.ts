import { TIngredientArr, TOrder } from "../../components/utils/types";

export const SET_CURRENT_ITEM: "SET_CURRENT_ITEM" = "SET_CURRENT_ITEM";
export const SET_CURRENT_ORDER: "SET_CURRENT_ORDER" = "SET_CURRENT_ORDER";
export const CLOSE_MODAL: "CLOSE_MODAL" = "CLOSE_MODAL";

export type TSetCurrentItemAction = {
  readonly id: string;
  readonly items: TIngredientArr;
  readonly type: typeof SET_CURRENT_ITEM;
};

export type TSetCurrentOrderAction = {
  readonly order: TOrder;
  readonly type: typeof SET_CURRENT_ORDER;
};

export type TCloseModalAction = {
  readonly type: typeof CLOSE_MODAL;
};

export type TModalActions =
  | TSetCurrentItemAction
  | TSetCurrentOrderAction
  | TCloseModalAction;
