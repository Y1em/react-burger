import { shortToken } from "../../components/utils/utils";

export const socketMiddleware = (wsUrl, wsActions) => {
  const accessToken = localStorage.getItem('accessToken');

  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store; // eslint-disable-line
      const { type, request, payload } = action; // eslint-disable-line
      const { wsInit, onOpen, onClose, onError, onOrders, onUserOrders } = wsActions; // eslint-disable-line


      if (request === "allOrders") {
        socket = new WebSocket(`${wsUrl}/all`);
      } else if (request === "allUserOrders") {
        socket = new WebSocket(`${wsUrl}?token=${shortToken(accessToken.toString())}`);
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
