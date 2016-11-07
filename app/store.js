import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/index.js';
import freeze from 'redux-freeze';  

const middlewares = [thunk];
if (process.env.NODE_ENVIRONMENT = 'development') {
  middlewares.push(freeze); 
}

const store = createStore(reducer, compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store

