import { getData, getOrder } from "../../components/utils/api.js";

const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";
const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
const GET_ORDER_FAILED = "GET_ORDER_FAILED";
const ADD_ITEM = "ADD_ITEM";
const GET_BUN_MESSAGE = "GET_BUN_MESSAGE";
const GET_EMPTY_ORDER_MESSAGE = "GET_EMPTY_ORDER_MESSAGE";
const DELETE_ITEM = "DELETE_ITEM";
const OPEN_DETAILS = "OPEN_DETAILS";
const CLOSE_MODAL = "CLOSE_MODAL";
const OPEN_ORDER = "OPEN_ORDER";
const SET_BUN = "SET_BUN";
const SET_COUNT = "SET_COUNT";
const SET_TOTAL_PRICE = "SET_TOTAL_PRICE";
const INCREASE_COUNTER = "INCREASE_COUNTER";
const DECREASE_COUNTER = "DECREASE_COUNTER";
const SET_TAB = "SET_TAB";
const SET_SCROLL_TOP = "SET_SCROLL_TOP";
const MOVE_ITEM = "MOVE_ITEM";

function getItems() {
  return async (dispatch) => {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    getData().then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data,
        });
      } else {
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      }
    });
  };
}

function getOrderData(ids) {
  return async (dispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrder(ids).then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          name: res.name,
          order: {
            number: res.order.number,
          },
        });
      } else {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      }
    });
  };
}

export {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  ADD_ITEM,
  GET_BUN_MESSAGE,
  GET_EMPTY_ORDER_MESSAGE,
  DELETE_ITEM,
  OPEN_DETAILS,
  CLOSE_MODAL,
  OPEN_ORDER,
  SET_BUN,
  SET_COUNT,
  SET_TOTAL_PRICE,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  SET_TAB,
  SET_SCROLL_TOP,
  MOVE_ITEM,
  getItems,
  getOrderData,
};
