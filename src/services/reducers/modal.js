import { SET_CURRENT_ITEM, CLOSE_MODAL } from "../actions/modal";

const InitialState = {
  currentItem: undefined,
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

    case CLOSE_MODAL: {
      localStorage.removeItem('currentItem');
      return {
        ...state,
        currentItem: null,
        ...(action.order.number = "..."),
      };
    }

    default: {
      return state;
    }
  }
};

export { modalReducer };
