import {combineReducers} from 'redux';
import artReducer from './artReducer.js';
import appReducer from './appReducer.js';
import competitionReducer from './competitionReducer.js';
import userReducer from './userReducer.js';
import userCompetitionsReducer from './userCompetitionsReducer.js';
import judgesReducer from './judgesReducer.js';
import resultsReducer from './resultsReducer.js';

export default combineReducers({
  competitionState: competitionReducer,
  artState: artReducer,
  appState: appReducer,
  userState: userReducer,
  userCompetitionsState: userCompetitionsReducer,
  judgesState: judgesReducer,
  resultsState: resultsReducer
})