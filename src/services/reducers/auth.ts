import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  UPDATE_USER_SUCCESS,
  PASSWORD_REQUEST_SUCCESS,
} from "../actions/auth";
import { TAuthActions } from "../actions/auth";

type TAuthState = {
  email: string;
  name: string;
  loginRequest: boolean;
  loginFailed: boolean;
  registerRequest: boolean;
  registerFailed: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
  passwordRequest: boolean;
};

export const InitialState: TAuthState = {
  email: "",
  name: "",
  loginRequest: false,
  loginFailed: false,
  registerRequest: false,
  registerFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  passwordRequest: false,
};

export const authReducer = (
  state: TAuthState = InitialState,
  action: TAuthActions
): TAuthState => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginFailed: false,
        email: action.email,
        name: action.name,
        loginRequest: false,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
      };
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerFailed: false,
        email: action.email,
        name: action.name,
        registerRequest: false,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutFailed: false,
        email: "",
        name: "",
        logoutRequest: false,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        email: action.email,
        name: action.name,
      };
    }
    case PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        passwordRequest: true,
      };
    }
    default: {
      return state;
    }
  }
};
