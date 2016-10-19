import {combineReducers} from 'redux';
import artReducer from './artReducer.js';
import appReducer from './appReducer.js';
import competitionReducer from './competitionReducer.js';
import userReducer from './userReducer.js';
import userCompetitionsReducer from './userCompetitionsReducer.js';
import resultsReducer from './resultsReducer.js';
import artImportsReducer from './artImportsReducer.js';
import categoriesReducer from './categoriesReducer.js';
import rankedUsersReducer from './rankedUsersReducer.js';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  competitionState: competitionReducer,
  artState: artReducer,
  appState: appReducer,
  userState: userReducer,
  userCompetitionsState: userCompetitionsReducer,
  rankedUsers: rankedUsersReducer,
  resultsState: resultsReducer,
  artImportState: artImportsReducer,
  categories: categoriesReducer,
  form: formReducer
})