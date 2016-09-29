import {combineReducers} from 'redux';
import artReducer from './artReducer.js';
import appReducer from './appReducer.js';
import competitionReducer from './competitionReducer.js';
import userReducer from './userReducer.js';


export default combineReducers({
  competitionState: competitionReducer,
  artState: artReducer,
  appState: appReducer,
  userState: userReducer
})