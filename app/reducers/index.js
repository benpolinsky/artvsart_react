import {combineReducers} from 'redux';
import artReducer from './artReducer.js';
import competitionReducer from './competitionReducer.js';

export default combineReducers({
  competitionState: competitionReducer,
  artState: artReducer
})