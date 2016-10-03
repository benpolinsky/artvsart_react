const initialState = {
  results: [],
  isFetching: false
}
const resultsReducer = (state=initialState, action) => {
  switch (action.type) {
    case "RESULTS_REQUEST":
      return {
        ...state,
        isFetching: true
      }
      
    case "RESULTS_RESPONSE":
      return {
        ...state, 
        results: action.results.top_winners,
        isFetching: false
      }
      
    case "RESULTS_REQUEST_FAILED":
      return {
        ...state,
        isFetching: true,
        errors: action.errors 
      }
  }
  return state 
}

export default resultsReducer