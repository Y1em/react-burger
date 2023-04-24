import { TIngredientArr } from "../../components/utils/types";
import { setCounter } from "../../components/utils/utils";
import {
  GET_ITEMS_FAILED,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_REQUEST,
} from "../actions/ingredients-api";
import { TItemsActions } from "../actions/ingredients-api";

type TIngredientsApiState = {
  items: TIngredientArr;
  itemsRequest: boolean;
  itemsFailed: boolean;
};

export const InitialState = {
  itemsRequest: false,
  itemsFailed: false,
  items: [],
};

export const ingredientsApiReducer = (
  state: TIngredientsApiState = InitialState,
  action: TItemsActions
): TIngredientsApiState => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }

    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        items: setCounter(action.items),
        itemsRequest: false,
      };
    }

    case GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }

    default: {
      return state;
    }
  }
};
