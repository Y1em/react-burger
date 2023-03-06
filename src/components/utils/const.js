const modalRoot = document.getElementById("react-modals");
const ingredientsTitle = "Детали ингредиента";
const baseOffset = 42;
const emptyOrderMessage = `Нельзя оформить пустой заказ. Добавьте\u00A0ингредиенты`;
const bunMessage = "Сначала выберите булку";
const initialMessage = "Перетащите ингридиенты сюда";
const emailRegex = /\w+@\w+\.\w+/;
const passwordRegex = /.{6,24}/;
const nameRegex = /\w{2,24}/;
const codeRegex = /\w{8}\-\w{4}\-\w{4}\-\w{4}\-\w{12}/;
const loginPath = '/login';
const homePath = '/';

export {modalRoot, ingredientsTitle, baseOffset, emptyOrderMessage, bunMessage, initialMessage, emailRegex, passwordRegex, nameRegex, codeRegex, homePath, loginPath }
