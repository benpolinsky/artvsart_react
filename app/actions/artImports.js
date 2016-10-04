import * as api from '../utils/ajaxHelpers.js'
import * as storage from '../localStorage.js'


export const searchSource = (source, query) => (dispatch) => {
  console.log(source);
  console.log(query);
  dispatch(searchSourceRequest());
  return api.searchSource({source: source, query: query}).then(response => {
    if (response.errors == null) {
      dispatch(displayResultsSuccess(response));      
    } else {
      dispatch(displayResultsErrors(response));
    }
  })
}

const searchSourceRequest = () => ({
  type: "SEARCH_SOURCE_REQUEST"
});

const displayResultsSuccess = (response) => ({
  type: "DISPLAY_RESULTS_SUCCESS",
  results: response.results
});

const displayResultsErrors = (response) => ({
  type: "DISPLAY_RESULTS_ERRORS",
  errors: response.errors
});

const importArt = () => ({

})
