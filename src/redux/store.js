import { createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';

import thunk from 'redux-thunk';
import reducer from './reducer';

const middlewares = [
  applyMiddleware(
    thunk,
    createMiddleware
  )
];

export let store = createStore(
  reducer,
  window.devToolsExtension && window.devToolsExtension(),
  compose(...middlewares)
);
