import { applyMiddleware, createStore, compose } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import { socketMiddleware } from "./middleware/socketmiddleware";
import thunk from "redux-thunk";
import thunkMiddleware from "redux-thunk";

import {
  WS_FEED_ERROR,
  WS_FEED_START,
  WS_FEED_SUCCESS,
  WS_FEED_CLOSE,
  WS_GET_ORDERS,
} from "./actions/ws-feed";

import {
  WS_PROFILE_ERROR,
  WS_PROFILE_START,
  WS_PROFILE_SUCCESS,
  WS_PROFILE_CLOSE,
  WS_GET_USER_ORDERS,
  WS_PROFILE_RECONNECT,
} from "./actions/ws-profile";

const wsFeedActions = {
  wsInit: WS_FEED_START,
  onOpen: WS_FEED_SUCCESS,
  onClose: WS_FEED_CLOSE,
  onError: WS_FEED_ERROR,
  onMessage: WS_GET_ORDERS,
};

const wsProfileActions = {
  wsInit: WS_PROFILE_START,
  onOpen: WS_PROFILE_SUCCESS,
  onClose: WS_PROFILE_CLOSE,
  onError: WS_PROFILE_ERROR,
  onMessage: WS_GET_USER_ORDERS,
  onReconnect: WS_PROFILE_RECONNECT,
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    thunkMiddleware,
    socketMiddleware(wsFeedActions),
    socketMiddleware(wsProfileActions)
  )
);

export const initStore = createStore(rootReducer, enhancer);
