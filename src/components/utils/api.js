const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export const getOrder = (arr, token) => {
  return fetch(`${config.baseUrl}/orders`, {
    method: "POST",
    headers: {
      ...config.headers,
      Authorization: token,
    },
    body: JSON.stringify({
      ingredients: arr,
    }),
  }).then(checkResponse);
};

export const getData = async () => {
  const res = await fetch(`${config.baseUrl}/ingredients`, {
    method: "GET",
    headers: config.headers,
  });
  return checkResponse(res);
};

export const register = (email, pass, name) => {
  return fetch(`${config.baseUrl}/auth/register`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      email: email,
      password: pass,
      name: name,
    }),
  }).then(checkResponse);
};

export const login = (email, pass) => {
  return fetch(`${config.baseUrl}/auth/login`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      email: email,
      password: pass,
    }),
  }).then(checkResponse);
};

export const logout = (token) => {
  return fetch(`${config.baseUrl}/auth/logout`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      token: token,
    }),
  }).then(checkResponse);
};

export const updateToken = (token) => {
  return fetch(`${config.baseUrl}/auth/token`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      token: token,
    }),
  }).then(checkResponse);
};

export const getUser = (token, update, refreshToken, trigger, action) => {
  return fetch(`${config.baseUrl}/auth/user`, {
    method: "GET",
    headers: {
      ...config.headers,
      Authorization: token,
    }
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      res.json()
      .then((data) => {
        if (data.message === 'jwt expired') {
          update(updateToken, refreshToken, trigger, action);
        } else {
          Promise.reject(`Ошибка: ${res.status}`);
        }
      });
    }
  })
};

export const updateUser = (token, user, update, refreshToken, trigger, action) => {
  return fetch(`${config.baseUrl}/auth/user`, {
    method: "PATCH",
    headers: {
      ...config.headers,
      Authorization: token,
    },
    body: JSON.stringify({
      email: user.email,
      name: user.name,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      res.json()
      .then((data) => {
        if (data.message === 'jwt expired') {
          update(updateToken, refreshToken, trigger, action, user);
        } else {
          Promise.reject(`Ошибка: ${res.status}`);
        }
      })
    }
  });
};

export const restorePassword = (email) => {
  return fetch(`${config.baseUrl}/password-reset`, {
    method: "POST",
    headers: {
      ...config.headers,
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkResponse);
};

export const getNewPassword = (password, code) => {
  return fetch(`${config.baseUrl}/password-reset/reset`, {
    method: "POST",
    headers: {
      ...config.headers,
    },
    body: JSON.stringify({
      password: password,
      token: code,
    }),
  }).then(checkResponse);
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject(`Ошибка: ${res.status}`);
  }
};
