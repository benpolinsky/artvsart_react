import {combineReducers} from 'redux';
import artReducer from './artReducer.js';
import appReducer from './appReducer.js';
import competitionReducer from './competitionReducer.js';
import UXReducer from './UXReducer.js';

export default combineReducers({
  competitionState: competitionReducer,
  artState: artReducer,
  ux: UXReducer,
  appState: appReducer
})