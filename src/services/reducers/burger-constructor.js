import {
  DELETE_ITEM,
  SET_TOTAL_PRICE,
  MOVE_ITEM,
  ADD_BUN,
  ADD_MAIN,
} from "../actions/burger-constructor";

import {
  getTotal,
  deleteItem,
  moveItem,
  isBun,
} from "../../components/utils/utils";

const initialState = {
  constructorBuns: [],
  constructorMains: [],
  totalPrice: 0,
};

const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        ...state.constructorBuns.push(
          action.items.find((item) =>
            item._id === action.id && isBun(item) ? item : null
          )
        ),
      };
    }

    case ADD_MAIN: {
      return {
        ...state,
        ...state.constructorMains.push(
            action.items.find((item) =>
            item._id === action.id && !isBun(item) ? item : null
          )
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

    default: {
      return state;
    }
  }
};

export { constructorReducer };
