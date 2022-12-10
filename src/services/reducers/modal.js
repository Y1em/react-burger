import { SET_CURRENT_ITEM, CLOSE_MODAL } from "../actions/modal";

const InitialState = {
  currentItem: undefined,
};

const modalReducer = (state = InitialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ITEM: {
      return {
        ...state,
        currentItem: action.items.find((item) =>
          item._id === action.id ? item : null
        ),
      };
    }

    case CLOSE_MODAL: {
      return {
        ...state,
        currentItem: undefined,
        ...(action.order.number = "..."),
      };
    }

    default: {
      return state;
    }
  }
};

export { modalReducer };
