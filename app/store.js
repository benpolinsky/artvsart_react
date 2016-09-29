import {createStore, applyMiddleware, compose} from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import {auth} from './middlewares/auth.js'
import reducer from './reducers/index.js';

const middlewares = [thunk, auth];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

const store = createStore(reducer, compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store

