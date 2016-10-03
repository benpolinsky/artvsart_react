import * as api from '../utils/ajax_helpers.js';
import * as storage from '../localStorage.js';

export const fetchUserCompetitions = () => (dispatch) => {
  dispatch(userCompetitionsRequest());
  return api.fetchUserCompetitions().then(response => {
    if (response.errors != null) {
      dispatch(userCompetitionsRequestFailed(response));      
    } else {
      dispatch(userCompetitionsResponse(response));
    }
  });
}

const userCompetitionsRequest = () => ({
  type: "USER_COMPETITIONS_REQUEST"
});

const userCompetitionsResponse = (response) => ({
  type: "USER_COMPETITIONS_RESPONSE",
  competitions: response.competitions
});

const userCompetitionsRequestFailed = () => ({
  type: "USER_COMPETITIONS_REQUEST_FAILED",
  errors: response.errors
});