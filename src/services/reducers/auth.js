import {
  LOGIN_FAILED,
  LOGIN_SUCCSES,
  LOGIN_REQUEST,
  REGISTER_FAILED,
  REGISTER_SUCCSES,
  REGISTER_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_SUCCSES,
  LOGOUT_FAILED,
  UPDATE_USER_SUCCSES,
  PASSWORD_REQUEST_SUCCSES,
} from "../actions/auth";

const InitialState = {
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

const authReducer = (state = InitialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case LOGIN_SUCCSES: {
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
        loginRequest: false
      };
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case REGISTER_SUCCSES: {
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
        registerRequest: false
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
      };
    }
    case LOGOUT_SUCCSES: {
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
        logoutRequest: false
      };
    }
    case UPDATE_USER_SUCCSES: {
      return {
        ...state,
        updateUserFailed: false,
        updateUserRequest: false,
        email: action.email,
        name: action.name,
      };
    }
    case PASSWORD_REQUEST_SUCCSES: {
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

export { authReducer };
