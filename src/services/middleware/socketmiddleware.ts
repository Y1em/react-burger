import { shortToken, update } from "../../components/utils/utils";
import { updateToken } from "../../components/utils/api";
import { getOrdersTrigger } from "../../components/utils/const";
import { TWsMiddlewareActions } from "../../components/utils/types";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWsMiddlewareActions
) => {
  return (store: any) => {
    let socket: any = null;

    return (next: any) => (action: any) => {
      const refreshToken = localStorage.getItem("refreshToken");
      const { dispatch, getState } = store; // eslint-disable-line
      const { type, request, payload } = action; // eslint-disable-line
      const {
        wsInit,
        onOpen,
        onClose,
        onError,
        onOrders,
        onUserOrders,
        wsClose,
      } = wsActions; // eslint-disable-line

      function getUserOrders() {
        dispatch({
          type: wsInit,
          request: "allUserOrders",
        });
      }

      if (request === "allOrders") {
        socket = new WebSocket(`${wsUrl}/all`);
      } else if (request === "allUserOrders") {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          socket = new WebSocket(
            `${wsUrl}?token=${shortToken(accessToken.toString())}`
          );
        }
      }

      if (type === wsClose) {
        socket?.close();
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event: Event) => {
          dispatch({ type: onError, payload: event });
        };

        if (request === "allOrders") {
          socket.onmessage = (event: MessageEvent) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;

            dispatch({ type: onOrders, payload: restParsedData });
          };
        } else if (request === "allUserOrders") {
          socket.onmessage = (event: MessageEvent) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
            if (!success && refreshToken) {
              update(
                updateToken,
                refreshToken,
                getOrdersTrigger,
                getUserOrders
              );
            }
            dispatch({ type: onUserOrders, payload: restParsedData });
          };
        }

        socket.onclose = (event: Event) => {
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
  };
};
