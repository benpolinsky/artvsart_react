import * as api from '../utils/ajaxHelpers.js'
import * as storage from '../localStorage.js'


export const searchSource = (source, query) => (dispatch) => {
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

export const importArt = (id, source) => (dispatch) => {
  dispatch(importArtRequest());
  return api.importArt(id, source).then(response => {
    if (response.errors == null) {
      dispatch(importArtResponse(response));      
    } else {
      dispatch(importArtFailed(response));
    }
  })
}

const importArtRequest = () => ({
  type: "IMPORT_ART_REQUEST"
})

const importArtResponse = (response) => ({
  type: "IMPORT_ART_RESPONSE",
  response: response
})

const importArtFailed = (response) => ({
  type: "IMPORT_ART_FAILED",
  errors: response.errors
})