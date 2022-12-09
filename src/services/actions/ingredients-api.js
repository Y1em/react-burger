import { getData } from "../../components/utils/api.js";

const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";

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
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      });
  };
}

export { GET_ITEMS_FAILED, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, getItems };
