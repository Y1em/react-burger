import {
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  SET_BUN,
  SET_COUNT,
  DELETE_ACTIVE_BUN,
} from "../actions/burger-ingredients";

const InitialState = {
  activeBunId: undefined,
};


const ingredientsReducer = (state = InitialState, action) => {
  switch (action.type) {
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
        ...action.items.forEach((item) => (item.count = 0)),
      };
    }

    case INCREASE_COUNTER: {
      return {
        ...state,
        ...action.items.find((item) =>
          item._id === action.id ? (item.count = item.count + 1) : null
        ),
      };
    }

    case DECREASE_COUNTER: {
      return {
        ...state,
        ...action.items.find((item) =>
          item._id === action.id ? (item.count = item.count - 1) : null
        ),
      };
    }

    case DELETE_ACTIVE_BUN: {
      return {
        ...state,
        activeBunId: undefined,
      };
    }

    default: {
      return state;
    }
  }
};

export { ingredientsReducer };
