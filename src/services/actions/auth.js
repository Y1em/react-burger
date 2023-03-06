import {
  login,
  register,
  logout
} from "../../components/utils/api";

const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCSES = "LOGIN_SUCCSES";
const LOGIN_FAILED = "LOGIN_FAILED";
const REGISTER_REQUEST = "REGISTER_REQUEST";
const REGISTER_SUCCSES = "REGISTER_SUCCSES";
const REGISTER_FAILED = "REGISTER_FAILED";
const LOGOUT_REQUEST = "LOGOUT_REQUEST";
const LOGOUT_SUCCSES = "LOGOUT_SUCCSES";
const LOGOUT_FAILED = "LOGOUT_FAILED";
const UPDATE_TOKEN_SUCCSES = "UPDATE_TOKEN_SUCCSES";
const UPDATE_USER_SUCCSES = "UPDATE_USER_SUCCSES";
const PASSWORD_REQUEST_SUCCSES = "PASSWORD_REQUEST_SUCCSES";

function userLogin(email, password) {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    login(email, password)
    .then((res) => {
      if (res && res.success) {
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch({
          type: LOGIN_SUCCSES,
          email: res.user.email,
          name: res.user.name,
          password: password,
          accessToken: res.accessToken,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: LOGIN_FAILED,
      });
    })
  };
};

function userRegister(email, password, name) {
  return async (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    register(email, password, name)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: REGISTER_SUCCSES,
          name: res.user.name,
          email: res.user.email,
          password: password,
          accessToken: res.accessToken,
        });
        localStorage.setItem('refreshToken', res.refreshToken);
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: REGISTER_FAILED,
      });
    })
  };
};

function userLogout(token) {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    logout(token)
    .then((res) => {
      if (res && res.success) {
        localStorage.removeItem('refreshToken');
        dispatch({
          type: LOGOUT_SUCCSES,
          name: "",
          email: "",
          password: "",
          accessToken: "",
        });

      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: LOGOUT_FAILED,
      });
    })
  };
};

export {
  LOGIN_REQUEST,
  LOGIN_SUCCSES,
  LOGIN_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCSES,
  REGISTER_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCSES,
  LOGOUT_FAILED,
  UPDATE_TOKEN_SUCCSES,
  UPDATE_USER_SUCCSES,
  PASSWORD_REQUEST_SUCCSES,
  userRegister,
  userLogin,
  userLogout,
};
