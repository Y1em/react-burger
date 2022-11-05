export const getData = (setter, callback) => {
  fetch("https://norma.nomoreparties.space/api/ingredients")
    .then(res => res.json())
    .then((arr) => {
      setter(callback(arr.data));
    })
    .catch((err) => console.log(err))
};
