import { combineReducers } from "redux";
import { ingredientsReducer } from "./burger-ingredients";
import { constructorReducer } from "./burger-constructor";
import { ingredientsApiReducer } from "./ingredients-api";
import { orderApiReducer } from "./order-api";
import { modalReducer } from "./modal";
import { authReducer } from "./auth";
import { headerReducer } from "./app-header";
import { wsFeedReducer } from "./ws-feed";
import { wsProfileReducer } from "./ws-profile";

export const rootReducer = combineReducers({
  ingredientsReducer,
  constructorReducer,
  ingredientsApiReducer,
  orderApiReducer,
  modalReducer,
  authReducer,
  headerReducer,
  wsFeedReducer,
  wsProfileReducer,
});
