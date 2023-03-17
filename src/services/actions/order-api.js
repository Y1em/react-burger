import { getOrder } from "../../components/utils/api.js";

const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
const GET_ORDER_FAILED = "GET_ORDER_FAILED";
const OPEN_ORDER = "OPEN_ORDER";

function getOrderData(ids, token) {
  return async (dispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrder(ids, token)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          name: res.name,
          order: {
            number: res.order.number,
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ORDER_FAILED,
      });
    })

  };
}

export {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  OPEN_ORDER,
  getOrderData,
};
