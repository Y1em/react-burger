import {
  SET_CURRENT_ITEM,
  CLOSE_MODAL,
  SET_CURRENT_ORDER
} from "../actions/modal";

const InitialState = {
  currentItem: undefined,
  currentOrder: undefined,
};

const modalReducer = (state = InitialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ITEM: {
      localStorage.setItem('currentItem', JSON.stringify(action.items.find((item) => item._id === action.id ? item : null)));
      return {
        ...state,
        currentItem: JSON.parse(localStorage.getItem('currentItem'))
      };
    }

    case SET_CURRENT_ORDER: {
      localStorage.setItem('currentOrder', JSON.stringify(action.order));
      return {
        ...state,
        currentOrder: JSON.parse(localStorage.getItem('currentOrder'))
      };
    }

    case CLOSE_MODAL: {
      localStorage.removeItem('currentItem');
      localStorage.removeItem('currentOrder');
      return {
        ...state,
        currentItem: null,
        currentOrder: null,
      };
    }

    default: {
      return state;
    }
  }
};

export { modalReducer };
