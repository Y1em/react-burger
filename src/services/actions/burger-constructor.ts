import { TIngredient } from "../../utils/types";
import { TIngredientArr } from "../../utils/types";

export const DELETE_ITEM: "DELETE_ITEM" = "DELETE_ITEM";
export const SET_TOTAL_PRICE: "SET_TOTAL_PRICE" = "SET_TOTAL_PRICE";
export const MOVE_ITEM: "MOVE_ITEM" = "MOVE_ITEM";
export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const ADD_MAIN: "ADD_MAIN" = "ADD_MAIN";
export const DELETE_ITEMS: "DELETE_ITEMS" = "DELETE_ITEMS";

export type TDeleteItemAction = {
  readonly id: string;
  readonly type: typeof DELETE_ITEM;
};

export type TSetTotalPriceAction = {
  readonly type: typeof SET_TOTAL_PRICE;
};

export type TMoveItemAction = {
  readonly index: number;
  readonly id: string;
  readonly type: typeof MOVE_ITEM;
};

export type TAddBunAction = {
  readonly item: TIngredient;
  readonly type: typeof ADD_BUN;
};

export type TAddMainAction = {
  readonly id: string;
  readonly items: TIngredientArr;
  readonly type: typeof ADD_MAIN;
};

export type TDeleteItemsAction = {
  readonly type: typeof DELETE_ITEMS;
};

export type TBurgerConstructorActions =
  | TDeleteItemAction
  | TSetTotalPriceAction
  | TMoveItemAction
  | TAddBunAction
  | TAddMainAction
  | TDeleteItemsAction;
