import { getData, getOrder } from "../../components/utils/api.js";

const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";
const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
const GET_ORDER_FAILED = "GET_ORDER_FAILED";
const DELETE_ITEM = "DELETE_ITEM";
const SET_CURRENT_ITEM = "SET_CURRENT_ITEM";
const CLOSE_MODAL = "CLOSE_MODAL";
const SET_BUN = "SET_BUN";
const SET_COUNT = "SET_COUNT";
const SET_TOTAL_PRICE = "SET_TOTAL_PRICE";
const INCREASE_COUNTER = "INCREASE_COUNTER";
const DECREASE_COUNTER = "DECREASE_COUNTER";
const MOVE_ITEM = "MOVE_ITEM";
const ADD_BUN = 'ADD_BUN';
const ADD_MAIN = 'ADD_MAIN'

function getItems() {
  return async (dispatch) => {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    getData()
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data,
        });
        dispatch({
          type: SET_COUNT,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ITEMS_FAILED,
      });
    })
  };
}

function getOrderData(ids) {
  return async (dispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrder(ids)
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
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  DELETE_ITEM,
  SET_CURRENT_ITEM,
  CLOSE_MODAL,
  SET_BUN,
  SET_COUNT,
  SET_TOTAL_PRICE,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  MOVE_ITEM,
  ADD_BUN,
  ADD_MAIN,
  getItems,
  getOrderData,
};
