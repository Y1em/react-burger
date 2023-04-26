import { shortToken, update } from "../../components/utils/utils";
import { updateToken } from "../../components/utils/api";
import { getOrdersTrigger } from "../../components/utils/const";
import { TWsMiddlewareActions } from "../../components/utils/types";
import { MiddlewareAPI } from "redux";


export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWsMiddlewareActions
) => {
  return (store: MiddlewareAPI<any, any>) => { // с типизацией (store: MiddlewareAPI<AppDispatch, RootState>) возникают ошибки
    let socket: any = null;

    return (next: any) => (action: any): any => {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");
      const { dispatch, getState } = store; // eslint-disable-line
      const { type, payload } = action; // eslint-disable-line
      const {
        wsInit,
        onOpen,
        onClose,
        onError,
        onOrders,
        onUserOrders,
        wsClose,
      } = wsActions; // eslint-disable-line
      const userOrdersRequest = accessToken ? `?token=${shortToken(accessToken.toString())}` : "";

      function getUserOrders() {
        dispatch({
          type: wsInit,
          payload: userOrdersRequest,
        });
      }

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
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

        if (payload === "/all") {
          socket.onmessage = (event: MessageEvent) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
            dispatch({ type: onOrders, payload: restParsedData});
          };
        } else if (payload === userOrdersRequest) {
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
            if (accessToken) {
              dispatch({ type: onUserOrders, payload: restParsedData });
            }
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
