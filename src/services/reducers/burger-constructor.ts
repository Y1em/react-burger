import {
  DELETE_ITEM,
  SET_TOTAL_PRICE,
  MOVE_ITEM,
  ADD_BUN,
  ADD_MAIN,
  DELETE_ITEMS,
} from "../actions/burger-constructor";
import {
  getTotal,
  deleteItem,
  moveItem,
  addMain,
  addBun,
} from "../../utils/utils";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { TIngredientArr } from "../../utils/types";

type TBurgerConstructorState = {
  constructorBuns: TIngredientArr;
  constructorMains: TIngredientArr;
  totalPrice: number;
};

export const initialState: TBurgerConstructorState = {
  constructorBuns: [],
  constructorMains: [],
  totalPrice: 0,
};

export const constructorReducer = (
  state: TBurgerConstructorState = initialState,
  action: TBurgerConstructorActions
): TBurgerConstructorState => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        constructorBuns: addBun(action.item, [...state.constructorBuns]),
      };
    }

    case ADD_MAIN: {
      return {
        ...state,
        constructorMains: addMain(
          [...state.constructorMains],
          action.items,
          action.id
        ),
      };
    }

    case DELETE_ITEM: {
      return {
        ...state,
        constructorMains: deleteItem([...state.constructorMains], action.id),
      };
    }

    case SET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: getTotal(state.constructorBuns, state.constructorMains),
      };
    }

    case MOVE_ITEM: {
      return {
        ...state,
        constructorMains: moveItem(
          [...state.constructorMains],
          action.id,
          action.index
        ),
      };
    }

    case DELETE_ITEMS: {
      return {
        ...state,
        constructorBuns: [],
        constructorMains: [],
        totalPrice: 0,
      };
    }

    default: {
      return state;
    }
  }
};
