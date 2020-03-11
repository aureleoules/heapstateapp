import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer from './reducers';

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware();
  } else {
    return applyMiddleware(createLogger())
  }
};

export const store = createStore(reducer, composeWithDevTools(getMiddleware()));