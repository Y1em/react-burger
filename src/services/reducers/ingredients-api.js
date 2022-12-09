import {
  GET_ITEMS_FAILED,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_REQUEST,
} from "../actions/ingredients-api";

const InitialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

const ingredientsApiReducer = (state = InitialState, action) => {
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

    default: {
      return state;
    }
  }
};

export { ingredientsApiReducer };
