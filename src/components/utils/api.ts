import { TUser } from "./types";

const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export const getOrder = async (arr: string[], token: string) => {
  const res = await fetch(`${config.baseUrl}/orders`, {
    method: "POST",
    headers: {
      ...config.headers,
      Authorization: token,
    },
    body: JSON.stringify({
      ingredients: arr,
    }),
  });
  return checkResponse(res);
};

export const getData = async () => {
  const res = await fetch(`${config.baseUrl}/ingredients`, {
    method: "GET",
    headers: config.headers,
  });
  return checkResponse(res);
};

export const register = async (email: string, pass: string, name: string) => {
  const res = await fetch(`${config.baseUrl}/auth/register`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      email: email,
      password: pass,
      name: name,
    }),
  });
  return checkResponse(res);
};

export const login = async (email: string, pass: string) => {
  const res = await fetch(`${config.baseUrl}/auth/login`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      email: email,
      password: pass,
    }),
  });
  return checkResponse(res);
};

export const logout = async (token: string) => {
  const res = await fetch(`${config.baseUrl}/auth/logout`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      token: token,
    }),
  });
  return checkResponse(res);
};

export const updateToken = async (token: string) => {
  const res = await fetch(`${config.baseUrl}/auth/token`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      token: token,
    }),
  });
  return checkResponse(res);
};

export const getUser = async (
  token: string,
  update: Function,
  refreshToken: string,
  trigger: string,
  action: Function
) => {
  const res = await fetch(`${config.baseUrl}/auth/user`, {
    method: "GET",
    headers: {
      ...config.headers,
      Authorization: token,
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    res.json().then((data) => {
      if (data.message === "jwt expired") {
        update(updateToken, refreshToken, trigger, action);
      } else {
        Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }
};

export const updateUser = async (
  token: string,
  user: TUser,
  update: Function,
  refreshToken: string,
  trigger: string,
  action: Function
) => {
  const res = await fetch(`${config.baseUrl}/auth/user`, {
    method: "PATCH",
    headers: {
      ...config.headers,
      Authorization: token,
    },
    body: JSON.stringify({
      email: user.email,
      name: user.name,
    }),
  });
  if (res.ok) {
    return res.json();
  } else {
    res.json().then((data) => {
      if (data.message === "jwt expired") {
        update(updateToken, refreshToken, trigger, action, user);
      } else {
        Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }
};

export const restorePassword = async (email: string) => {
  const res = await fetch(`${config.baseUrl}/password-reset`, {
    method: "POST",
    headers: {
      ...config.headers,
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  return checkResponse(res);
};

export const getNewPassword = async (password: string, code: string) => {
  const res = await fetch(`${config.baseUrl}/password-reset/reset`, {
    method: "POST",
    headers: {
      ...config.headers,
    },
    body: JSON.stringify({
      password: password,
      token: code,
    }),
  });
  return checkResponse(res);
};

function checkResponse(res: any) {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject(`Ошибка: ${res.status}`);
  }
}
