import {
  increaseCounter,
  decreaseCounter,
  resetCounter,
} from "../../components/utils/utils";
import {
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  SET_BUN,
  DELETE_ACTIVE_BUN,
  RESET_COUNTER,
} from "../actions/burger-ingredients";
import { TBurgerIngredientsActions } from "../actions/burger-ingredients";

type TBurgerIngredientsState = {
  activeBunId: string;
};

export const InitialState = {
  activeBunId: "",
};

export const ingredientsReducer = (
  state: TBurgerIngredientsState = InitialState,
  action: TBurgerIngredientsActions
): TBurgerIngredientsState => {
  switch (action.type) {
    case SET_BUN: {
      return {
        ...state,
        activeBunId:
          action.ingredientType === "bun" ? action.id : state.activeBunId,
      };
    }

    case INCREASE_COUNTER: {
      increaseCounter(action.items, action.id);
      return {
        ...state,
      };
    }

    case DECREASE_COUNTER: {
      decreaseCounter(action.items, action.id);
      return {
        ...state,
      };
    }

    case RESET_COUNTER: {
      resetCounter(action.items);
      return {
        ...state,
      };
    }

    case DELETE_ACTIVE_BUN: {
      return {
        ...state,
        activeBunId: "",
      };
    }

    default: {
      return state;
    }
  }
};
