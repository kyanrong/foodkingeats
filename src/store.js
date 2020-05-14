import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

const history = createBrowserHistory();

const rootReducer = history => combineReducers({
  app: reducer,
  router: connectRouter(history),
});

const store = createStore(
  rootReducer(history),
  compose(
    applyMiddleware(thunk, routerMiddleware(history)),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export { history, store };
