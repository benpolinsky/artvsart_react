import * as api from '../utils/ajaxHelpers.js';
import * as storage from '../utils/localStorage.js';

export const fetchResults = () => (dispatch) => {
  dispatch(fetchResultsRequest());
  return api.get('results').then(response => {
    if (response.errors != null) {
      dispatch(resultsRequestFailed(response));      
    } else {
      dispatch(resultsResponse(response));
    }
  });
}

const fetchResultsRequest = () => ({
  type: "RESULTS_REQUEST"
});

const resultsResponse = (response) => ({
  type: "RESULTS_RESPONSE",
  results: response.art_results
});

const resultsRequestFailed = (response) => ({
  type: "RESULTS_REQUEST_FAILED",
  errors: response.errors
});