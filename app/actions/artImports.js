import * as api from '../utils/ajaxHelpers.js'
import * as storage from '../utils/localStorage.js'
import {displayNotice} from './app.js';


export const searchSource = (source, query) => (dispatch) => {
  dispatch(searchSourceRequest());
  return api.searchSource({source: source, query: query}).then(response => {
    if (response.errors == null) {
      dispatch(displayResultsSuccess(response));      
    } else {
      dispatch(displayResultsErrors(response.errors));
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

const displayResultsErrors = (error) => ({
  type: "DISPLAY_RESULTS_ERRORS",
  errors: error
});

export const importArt = (id, source) => (dispatch) => {
  dispatch(importArtRequest());
  return api.post('art/import', {id: id, source: source}).then(response => {
    if (response.error) {
      dispatch(importArtFailed([response.error]))
      dispatch(displayNotice(response.error))
    }
    else if (response.errors) {
      dispatch(importArtFailed(response.errors));
      dispatch(displayNotice(response.errors))
    } else {
      dispatch(importArtResponse(response));
      dispatch(displayNotice("Imported!"))    
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

const importArtFailed = (errors) => ({
  type: "IMPORT_ART_FAILED",
  errors: errors
})