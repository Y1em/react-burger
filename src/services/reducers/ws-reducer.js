import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_GET_USER_ORDERS,
  WS_CONNECTION_CLOSE
} from '../actions/ws-actions';

const initialState = {
  wsConnected: false,
  data: [],
  userData: []
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        data: action.payload
      };

    case WS_GET_USER_ORDERS:
      return {
        ...state,
        userData: action.payload
      };

    case WS_CONNECTION_CLOSE:
      return {
        ...state,
        data: [],
        userData: [],
      };
    default:
      return state;
  }
};
