export const getData = () => {
  return fetch("https://norma.nomoreparties.space/api/ingredients")
    .then(checkResponse)
};


function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject(`Ошибка: ${res.status}`);
  }
}
