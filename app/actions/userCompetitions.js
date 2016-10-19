import * as api from '../utils/ajaxHelpers.js';
import * as storage from '../utils/localStorage.js';

export const fetchUserCompetitions = () => (dispatch) => {
  dispatch(userCompetitionsRequest());
  return api.get('user/competitions').then(response => {
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
  competitions: response.competition_size
});

const userCompetitionsRequestFailed = () => ({
  type: "USER_COMPETITIONS_REQUEST_FAILED",
  errors: response.errors
});