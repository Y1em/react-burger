import {
  GET_ITEMS_FAILED,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_REQUEST,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  ADD_ITEM,
  GET_BUN_MESSAGE,
  GET_EMPTY_ORDER_MESSAGE,
  DELETE_ITEM,
  OPEN_DETAILS,
  CLOSE_MODAL,
  OPEN_ORDER,
  SET_BUN,
  SET_COUNT,
  SET_TOTAL_PRICE,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  SET_TAB,
  SET_SCROLL_TOP,
  MOVE_ITEM,
} from "../actions/ingredients";

import { getTotal, deleteItem, moveItem } from "../../components/utils/utils";

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  constructorItems: [],
  message: "Перетащите ингридиенты сюда",
  currentItem: undefined,
  displayCurrentItem: false,
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
  currentTab: "one",
  scrollTop: 0,
  setScrollTop: (action) => {
    if (action.value === "one") {
      return 0;
    } else if (action.value === "two") {
      return 300;
    } else if (action.value === "three") {
      return 1400;
    }
  },
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
        orderFailed: false,
        order: action.order,
        name: action.name,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }

    case ADD_ITEM: {
      return {
        ...state,
        ...state.constructorItems.push(
          [...state.items].find((item) =>
            item._id === action.id ? item : null
          )
        ),
      };
    }

    case GET_BUN_MESSAGE: {
      return {
        ...state,
        message: "Сначала выберите булку",
      };
    }

    case GET_EMPTY_ORDER_MESSAGE: {
      return {
        ...state,
        message: `Нельзя оформить пустой заказ. Добавьте\u00A0ингредиенты`,
      };
    }

    case DELETE_ITEM: {
      return {
        ...state,
        constructorItems: deleteItem([...state.constructorItems], action.id),
      };
    }

    case OPEN_DETAILS: {
      return {
        ...state,
        currentItem: [...state.items].find((item) =>
          item._id === action.id ? item : null
        ),
        displayCurrentItem: true,
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

    case OPEN_ORDER: {
      return {
        ...state,
        displayOrder: true,
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
        totalPrice: getTotal(state.constructorItems),
      };
    }

    case SET_TAB: {
      return {
        ...state,
        currentTab: action.value,
      };
    }

    case SET_SCROLL_TOP: {
      return {
        ...state,
        scrollTop: state.setScrollTop(action),
      };
    }

    case MOVE_ITEM: {
      return {
        ...state,
        constructorItems: moveItem(
          [...state.constructorItems],
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
