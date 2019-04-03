import { createStore, applyMiddleware } from 'redux';
//import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import combinedReducers from './reducers';
import combinedDefaultState from './default';

//const loggerMiddleware = createLogger();

export const store = createStore(
  combinedReducers,
  combinedDefaultState,
  applyMiddleware(
    thunkMiddleware/*,
    loggerMiddleware*/
  )
);