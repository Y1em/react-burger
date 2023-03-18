import { shortToken, update } from "../../components/utils/utils";
import { updateToken } from "../../components/utils/api";
import { getOrdersTrigger } from "../../components/utils/const";

export const socketMiddleware = (wsUrl, wsActions) => {

  return store => {
    let socket = null;

    return next => action => {

      const refreshToken = localStorage.getItem('refreshToken');
      const { dispatch, getState } = store; // eslint-disable-line
      const { type, request, payload } = action; // eslint-disable-line
      const { wsInit, onOpen, onClose, onError, onOrders, onUserOrders, wsClose } = wsActions; // eslint-disable-line

      function getUserOrders() {
        dispatch({
          type: wsInit,
          request: "allUserOrders",
         });
      }

      if (request === "allOrders") {
        socket = new WebSocket(`${wsUrl}/all`);
      } else if (request === "allUserOrders") {
        const accessToken = localStorage.getItem('accessToken');
        socket = new WebSocket(`${wsUrl}?token=${shortToken(accessToken.toString())}`);
      }

      if (type === wsClose) {
        socket?.close();
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        if (request === "allOrders") {
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;

            dispatch({ type: onOrders, payload: restParsedData });
          };
        } else if (request === "allUserOrders") {
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
            if (!success) {
              update(updateToken, refreshToken, getOrdersTrigger, getUserOrders)
            }
            dispatch({ type: onUserOrders, payload: restParsedData });
          };
        }

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
  };
};
