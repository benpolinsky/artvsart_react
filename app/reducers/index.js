import {combineReducers} from 'redux';
import artReducer from './artReducer.js';
import appReducer from './appReducer.js';
import competitionReducer from './competitionReducer.js';


export default combineReducers({
  competitionState: competitionReducer,
  artState: artReducer,
  appState: appReducer
})