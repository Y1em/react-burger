import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { socketMiddleware } from './middleware/socketmiddleware';
import thunk from 'redux-thunk';
import thunkMiddleware from 'redux-thunk';

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSE,
  WS_GET_ORDERS,
  WS_GET_USER_ORDERS,
 } from './actions/ws-actions';

 const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onOrders: WS_GET_ORDERS,
  onUserOrders: WS_GET_USER_ORDERS,
  wsClose: WS_CONNECTION_CLOSE,
};

const wsUrl = "wss://norma.nomoreparties.space/orders";

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, thunkMiddleware, socketMiddleware(wsUrl, wsActions)));

/* const store = createStore(rootReducer, enhancer); */

export const initStore = () =>
  createStore(
    rootReducer,
    enhancer
  );
