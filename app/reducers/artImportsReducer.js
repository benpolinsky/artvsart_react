const initialArtState = {
  new_data: false,
  loading: false,
  loading_message: "loading",
  results: [],
  listing_id: ""
}

const artImportsReducer = (state=initialArtState, action) => {
  switch (action.type) {
  case "SEARCH_SOURCE_REQUEST":
    return {
      ...state, 
      loading: true
    }
  case "DISPLAY_RESULTS_SUCCESS":
    return {
      ...state, 
      loading: false,
      results: action.results
    }
    
  case "DISPLAY_RESULTS_ERRORS":
    return {
      ...state,
      loading: false,
      errors: action.errors
    }
  }
  return state
}

export default artImportsReducer