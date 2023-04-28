import { TIngredientArr } from "../../utils/types";

export const SET_BUN: "SET_BUN" = "SET_BUN";
export const INCREASE_COUNTER: "INCREASE_COUNTER" = "INCREASE_COUNTER";
export const DECREASE_COUNTER: "DECREASE_COUNTER" = "DECREASE_COUNTER";
export const DELETE_ACTIVE_BUN: "DELETE_ACTIVE_BUN" = "DELETE_ACTIVE_BUN";
export const RESET_COUNTER: "RESET_COUNTER" = "RESET_COUNTER";

export type TSetBunAction = {
  readonly id: string;
  readonly ingredientType: string;
  readonly type: typeof SET_BUN;
};

export type TIncreaseCounterAction = {
  readonly id: string;
  readonly items: TIngredientArr;
  readonly type: typeof INCREASE_COUNTER;
};

export type TDecreaseCounterAction = {
  readonly id: string;
  readonly items: TIngredientArr;
  readonly type: typeof DECREASE_COUNTER;
};

export type TDeleteActiveBunAction = {
  readonly type: typeof DELETE_ACTIVE_BUN;
};

export type TResetCounterAction = {
  readonly items: TIngredientArr;
  readonly type: typeof RESET_COUNTER;
};

export type TBurgerIngredientsActions =
  | TSetBunAction
  | TIncreaseCounterAction
  | TDecreaseCounterAction
  | TDeleteActiveBunAction
  | TResetCounterAction;
