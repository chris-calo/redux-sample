import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

export const initStore = (state) => {
  return createStore(rootReducer, state, applyMiddleware(thunkMiddleware));
};
