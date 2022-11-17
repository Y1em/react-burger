const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    authorization: "dc40e991-7393-4c7a-83ae-1391b0c1505f",
    "Content-Type": "application/json",
  },
};

export const getOrder = (arr) => {
  return fetch(`${config.baseUrl}/orders`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      "ingredients": arr,
    }),
  }).then(checkResponse);
}

export const getData = () => {
  return fetch(`${config.baseUrl}/ingredients`)
    .then(checkResponse)
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject(`Ошибка: ${res.status}`);
  }
}
