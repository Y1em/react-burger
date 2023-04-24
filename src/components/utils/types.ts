import { initStore } from "../../services/store";
import { TItemsActions } from "../../services/actions/ingredients-api";
import { TAuthActions } from "../../services/actions/auth";
import { TWsActions } from "../../services/actions/ws-actions";
import { TModalActions } from "../../services/actions/modal";
import { TOrderActions } from "../../services/actions/order-api";
import { TAppHeaderActions } from "../../services/actions/app-header";
import { TBurgerConstructorActions } from "../../services/actions/burger-constructor";
import { TBurgerIngredientsActions } from "../../services/actions/burger-ingredients";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

// общие

export type TIngredient = {
  _id: string;
  name: string;
  type: "bun" | "main" | "sauce";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  count: number;
};

export type TIngredientArr = TIngredient[];

export type TOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: "done" | "created" | "pending";
  updatedAt: string;
  _id: string;
};

export type TOrderArr = TOrder[];

export type TUser = {
  name: string;
  email: string;
};

export type TResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: TUser;
};

export type TwsResponse = {
  orders: TOrderArr;
  success: boolean;
  total: number;
  totalToday: number;
};

// Пропсы компонентов

export type TIngredintsContainerProps = {
  ingredients: TIngredientArr[];
};

export type TIngredientsSubcontainerProps = {
  sortedIngredients: TIngredientArr;
};
export type TIngredientProps = {
  ingredient: TIngredient;
};

export type TConstructuonContainer = {
  mainList: TIngredientArr;
  bunList: TIngredientArr;
  message: string;
  handleSetMessage: Function;
};

export type TConstructorItem = {
  ingredient: TIngredient;
  position?: string;
  index?: number;
};

export type TModalProps = {
  children: JSX.Element;
  title?: string;
};

export type TModalOverlayProps = {
  children: JSX.Element;
  handleClose: Function;
};

export type TorderModalProps = {
  obj: TOrder;
};

export type TIngredientModalProps = {
  obj: TIngredient;
};

export type TBoardStatusProps = {
  status: TOrder["status"];
  orders: TOrderArr;
};

export type TTabProps = {
  currentTab: "one" | "two" | "three";
  setTab: Function;
};

export type TFeedItemProps = {
  order: TOrder;
  type: "orders" | "feed";
};

export type THeaderItemProps = {
  name: "Конструктор" | "Лента заказов" | "Личный кабинет";
  icon: JSX.Element;
  active: boolean;
};

export type TProtectedRoutesProps = {
  element: JSX.Element;
  path: string;
  isAuthorized: boolean;
};

// Стейты компонентов

export type TIngredientItemState = {
  display: boolean;
  count: number;
};

export type TConstructorItemState = {
  name: string;
  price: number;
  thumbnail: string;
  type: "top" | "bottom" | undefined;
  isLocked: boolean | undefined;
};

// redux & thunk

export type TWsMiddlewareActions = {
  wsInit: "WS_CONNECTION_START";
  onOpen: "WS_CONNECTION_SUCCESS";
  onClose: "WS_CONNECTION_CLOSED";
  onError: "WS_CONNECTION_ERROR";
  onOrders: "WS_GET_ORDERS";
  onUserOrders: "WS_GET_USER_ORDERS";
  wsClose: "WS_CONNECTION_CLOSE";
};

export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;
export type RootState = ReturnType<typeof initStore.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TAppActions
>;

type TAppActions =
  | TWsActions
  | TAuthActions
  | TItemsActions
  | TModalActions
  | TOrderActions
  | TAppHeaderActions
  | TBurgerConstructorActions
  | TBurgerIngredientsActions;
