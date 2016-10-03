import * as api from '../utils/ajax_helpers.js';
import * as storage from '../localStorage.js';

export const fetchTopJudges = () => (dispatch) => {
  dispatch(topJudgesRequest());
  return api.fetchTopJudges().then(response => {
    if (response.errors != null) {
      dispatch(topJudgesRequestFailed(response));      
    } else {
      dispatch(topJudgesResponse(response));
    }
  });
}

const topJudgesRequest = () => ({
  type: "TOP_JUDGES_REQUEST"
});

const topJudgesResponse = (response) => ({
  type: "TOP_JUDGES_RESPONSE",
  judges: response.top_judges
});

const topJudgesRequestFailed = () => ({
  type: "TOP_JUDGES_REQUEST_FAILED",
  errors: response.errors
});