const initialArtState = {
  new_data: false,
  loading: false,
  loading_message: "loading",
  results: [],
  listing_id: "",
  errors: [],
  importedArtId: null
}

const artImportsReducer = (state=initialArtState, action) => {
  switch (action.type) {
  case "SEARCH_SOURCE_REQUEST":
    return {
      ...state, 
      loading: true,
      errors: [],
      results: []
    }
  case "DISPLAY_RESULTS_SUCCESS":
    return {
      ...state, 
      loading: false,
      results: action.results,
      errors: []
    }
    
  case "DISPLAY_RESULTS_ERRORS":
    return {
      ...state,
      loading: false,
      errors: action.errors
    }
  case "IMPORT_ART_REQUEST":
    return {
      ...state, 
      loading: true,
      errors: []
    }
  case "IMPORT_ART_RESPONSE":
    return {
      ...state,
      results: state.results.map((result) => {
        if (result['id'] == action.response.listing_id) {
          return {...result, imported: true, art_id: action.response.new_art[0].id}
        } 
        return result
        
      }),
      loading: false,
      errors: [],
      importedArtId: action.response.new_art[0].id
    }
  case "IMPORT_ART_FAILED":
    return {
      ...state, 
      loading: false,
      errors: action.errors,
      importedArtId: null
    }
  }
  return state
}

export default artImportsReducer