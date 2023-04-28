import { login, register, logout } from "../../utils/api";
import { AppThunk } from "../../utils/types";

export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";
export const REGISTER_REQUEST: "REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_SUCCESS: "REGISTER_SUCCESS" = "REGISTER_SUCCESS";
export const REGISTER_FAILED: "REGISTER_FAILED" = "REGISTER_FAILED";
export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const PASSWORD_REQUEST_SUCCESS: "PASSWORD_REQUEST_SUCCESS" =
  "PASSWORD_REQUEST_SUCCESS";

export type TLoginRequestAction = {
  readonly type: typeof LOGIN_REQUEST;
};

export type TLoginSuccessAction = {
  readonly type: typeof LOGIN_SUCCESS;
  readonly name: string;
  readonly email: string;
};

export type TLoginFailedAction = {
  readonly type: typeof LOGIN_FAILED;
};

export type TRegisterRequestAction = {
  readonly type: typeof REGISTER_REQUEST;
};

export type TRegisterSuccessAction = {
  readonly type: typeof REGISTER_SUCCESS;
  readonly name: string;
  readonly email: string;
};

export type TRegisterFailedAction = {
  readonly type: typeof REGISTER_FAILED;
};

export type TLogoutRequestAction = {
  readonly type: typeof LOGOUT_REQUEST;
};

export type TLogoutSuccessAction = {
  readonly type: typeof LOGOUT_SUCCESS;
  readonly name: string;
  readonly email: string;
};

export type TLogoutFailedAction = {
  readonly type: typeof LOGOUT_FAILED;
};

export type TUpdateUserSuccessAction = {
  readonly email: string;
  readonly name: string;
  readonly type: typeof UPDATE_USER_SUCCESS;
};

export type TPasswordRequestSuccessAction = {
  readonly type: typeof PASSWORD_REQUEST_SUCCESS;
};

export type TAuthActions =
  | TLoginRequestAction
  | TLoginSuccessAction
  | TLoginFailedAction
  | TRegisterRequestAction
  | TRegisterSuccessAction
  | TRegisterFailedAction
  | TLogoutRequestAction
  | TLogoutSuccessAction
  | TLogoutFailedAction
  | TUpdateUserSuccessAction
  | TPasswordRequestSuccessAction;

export const getLoginRequestAction = (): TLoginRequestAction => ({
  type: LOGIN_REQUEST,
});

export const getLoginSuccessAction = (
  name: string,
  email: string
): TLoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  name,
  email,
});

export const getLoginFailedAction = (): TLoginFailedAction => ({
  type: LOGIN_FAILED,
});

export const getRegisterRequestAction = (): TRegisterRequestAction => ({
  type: REGISTER_REQUEST,
});

export const getRegisterSuccessAction = (
  name: string,
  email: string
): TRegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  name,
  email,
});

export const getRegisterFailedAction = (): TRegisterFailedAction => ({
  type: REGISTER_FAILED,
});

export const getLogoutRequestAction = (): TLogoutRequestAction => ({
  type: LOGOUT_REQUEST,
});

export const getLogoutSuccessAction = (
  name: string,
  email: string
): TLogoutSuccessAction => ({
  type: LOGOUT_SUCCESS,
  name,
  email,
});

export const getLogoutFailedAction = (): TLogoutFailedAction => ({
  type: LOGOUT_FAILED,
});

export function userLogin(email: string, password: string): AppThunk {
  return async (dispatch) => {
    dispatch(getLoginRequestAction());
    login(email, password)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("password", password);
          dispatch(getLoginSuccessAction(res.user.name, res.user.email));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(getLoginFailedAction());
      });
  };
}

export function userRegister(
  email: string,
  password: string,
  name: string
): AppThunk {
  return async (dispatch) => {
    dispatch(getRegisterRequestAction());
    register(email, password, name)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("password", password);
          dispatch(getRegisterSuccessAction(res.user.name, res.user.email));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(getRegisterFailedAction());
      });
  };
}

export function userLogout(token: string): AppThunk {
  return async (dispatch) => {
    dispatch(getLogoutRequestAction());
    logout(token)
      .then((res) => {
        if (res && res.success) {
          localStorage.clear();
          dispatch(getLogoutSuccessAction("", ""));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(getLogoutFailedAction());
      });
  };
}
