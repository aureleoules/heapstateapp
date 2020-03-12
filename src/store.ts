import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer from './reducers';

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(thunkMiddleware);
  } else {
    return applyMiddleware(thunkMiddleware, createLogger())
  }
};

export const store = createStore(reducer, composeWithDevTools(getMiddleware()));