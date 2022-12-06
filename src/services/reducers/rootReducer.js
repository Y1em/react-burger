import { combineReducers } from 'redux';
import { ingredienstReducer } from './ingredients';

export const rootReducer = combineReducers({
  ingredients: ingredienstReducer,
})
