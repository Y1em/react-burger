const modalRoot = document.getElementById("react-modals");
const ingredientsTitle = "Детали ингредиента";
const baseOffset = 42;
const emptyOrderMessage = `Нельзя оформить пустой заказ. Добавьте\u00A0ингредиенты`;
const bunMessage = "Сначала выберите булку";
const initialMessage = "Перетащите ингридиенты сюда";
const emailRegex = /\w+@\w+\.\w+/;
const passwordRegex = /.{6,24}/;
const nameRegex = /\w{2,24}/;
const codeRegex = /\w{8}\-\w{4}\-\w{4}\-\w{4}\-\w{12}/; // eslint-disable-line
const loginPath = '/login';
const homePath = '/';
const resetPath = '/reset-password';
const registerPath = '/register';
const forgotPath = '/forgot-password';
const profilePath = '/profile';
const ingredientPath = '/ingredients/:id';
const wrongPath = '/*';
const ordersPath = '/profile/orders';
const orderPath = '/profile/orders/:id';
const feedPath = '/feed';
const orderFeedPath = '/feed/:id';
const getUserTrigger = 'getUserTrigger';
const updateUserTrigger = 'updateUserTrigger';
const reLoginTrigger = 'reLoginTrigger';

export {
  modalRoot,
  ingredientsTitle,
  baseOffset,
  emptyOrderMessage,
  bunMessage,
  initialMessage,
  emailRegex,
  passwordRegex,
  nameRegex,
  codeRegex,
  homePath,
  loginPath,
  resetPath,
  registerPath,
  forgotPath,
  profilePath,
  ingredientPath,
  wrongPath,
  ordersPath,
  feedPath,
  orderFeedPath,
  orderPath,
  getUserTrigger,
  updateUserTrigger,
  reLoginTrigger
}
