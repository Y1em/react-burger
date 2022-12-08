import {
  GET_ITEMS_FAILED,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_REQUEST,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  DELETE_ITEM,
  SET_CURRENT_ITEM,
  CLOSE_MODAL,
  SET_BUN,
  SET_COUNT,
  SET_TOTAL_PRICE,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  MOVE_ITEM,
  ADD_BUN,
  ADD_MAIN,
} from "../actions/ingredients";

import { getTotal, deleteItem, moveItem, isBun } from "../../components/utils/utils";

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  constructorItems: [],
  constructorBuns: [],
  constructorMains: [],
  currentItem: undefined,
  activeBunId: undefined,
  activeItemId: undefined,
  displayOrder: false,
  name: "",
  order: {
    number: "...",
  },
  orderRequest: false,
  orderFailed: false,
  totalPrice: 0,
};

const ingredienstReducer = (state = initialState, action) => {
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
        items: action.items,
        itemsRequest: false,
      };
    }
    case GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }

    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        ...state.items.forEach((item) => (item.count = 0)),
        orderFailed: false,
        order: action.order,
        name: action.name,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }

    case ADD_BUN: {
      return {
        ...state,
        ...state.constructorBuns.push(
          [...state.items].find((item) =>
            (item._id === action.id && isBun(item)) ? item : null
          )
        ),
      };
    }

    case ADD_MAIN: {
      return {
        ...state,
        ...state.constructorMains.push(
          [...state.items].find((item) =>
            (item._id === action.id && !isBun(item)) ? item : null
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

    case SET_CURRENT_ITEM: {
      return {
        ...state,
        currentItem: [...state.items].find((item) =>
          item._id === action.id ? item : null
        ),
      };
    }

    case CLOSE_MODAL: {
      return {
        ...state,
        currentItem: undefined,
        displayCurrentItem: false,
        displayOrder: false,
        order: {
          number: "...",
        },
      };
    }

    case SET_BUN: {
      return {
        ...state,
        activeBunId:
          action.ingredientType === "bun" ? action.id : state.activeBunId,
      };
    }

    case SET_COUNT: {
      return {
        ...state,
        ...state.items.forEach((item) => (item.count = 0)),
      };
    }

    case INCREASE_COUNTER: {
      return {
        ...state,
        ...state.items.find((item) =>
          item._id === action.id ? (item.count = item.count + 1) : null
        ),
      };
    }

    case DECREASE_COUNTER: {
      return {
        ...state,
        ...state.items.find((item) =>
          item._id === action.id ? (item.count = item.count - 1) : null
        ),
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

export { ingredienstReducer };
