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
      loading: true,
      error: '',
      results: []
    }
  case "DISPLAY_RESULTS_SUCCESS":
    return {
      ...state, 
      loading: false,
      results: action.results,
      error: ''
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
      loading: true,
      error: ''
    }
  case "IMPORT_ART_RESPONSE":
    return {
      ...state,
      results: state.results.map((result) => {
        if (result['id'] == action.response.listing_id) {
          return {...result, imported: true}
        } 
        return result
        
      }),
      loading: false,
      error: ''
    }
  case "IMPORT_ART_FAILED":
    return {
      ...state, 
      loading: false,
      error: action.errors
    }
  }
  return state
}

export default artImportsReducer