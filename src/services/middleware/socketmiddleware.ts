import { TWsMiddlewareActions } from "../../utils/types";
import { Middleware, MiddlewareAPI } from "redux";

export const socketMiddleware = (
  wsActions: TWsMiddlewareActions
): Middleware => {
  return (store: MiddlewareAPI<any, any>) => {
    let socket: WebSocket | null = null

    return (next) => (action) => {
      const wsUrl = "wss://norma.nomoreparties.space/orders";
      const { dispatch } = store; // eslint-disable-line
      const { type, payload } = action; // eslint-disable-line
      const {
        wsInit,
        onOpen,
        onMessage,
        onError,
        onClose,
        onReconnect,
        wsClose,
      } = wsActions; // eslint-disable-line

      if (type === wsInit) {

        socket = new WebSocket(`${wsUrl}${payload}`);

      }

      if (socket) {

        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event: Event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, message, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData});

          if (socket && message === "Invalid or missing token") {
            socket.onclose = (event: any) => {
              dispatch({ type: onReconnect, payload: !event.wasClean });
            };
          }
        };

        socket.onclose = (event: Event) => {
          dispatch({ type: onClose, payload: event });
        };

      }

      if (type === wsClose) {
        socket?.close();
      }

      next(action);
    };
  };
};
