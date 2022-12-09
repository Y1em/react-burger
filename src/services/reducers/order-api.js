import {
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
} from "../actions/order-api";

const InitialState = {
  name: "",
  order: {
    number: "...",
  },
  orderRequest: false,
  orderFailed: false,
};

const orderApiReducer = (state = InitialState, action) => {
  switch (action.type) {
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

    default: {
      return state;
    }
  }
};

export { orderApiReducer };
