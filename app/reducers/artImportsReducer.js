const initialArtState = {
  new_data: false,
  loading: false,
  loading_message: "loading",
  results: [],
  listing_id: "",
  error: ''
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
      error: action.errors
    }
  case "IMPORT_ART_REQUEST":
    return {
      ...state, 
      loading: true
    }
  case "IMPORT_ART_RESPONSE":
    return {
      ...state, 
      loading: false
    }
  case "IMPORT_ART_FAILED":
    return {
      ...state, 
      loading: false
    }
  }
  return state
}

export default artImportsReducer