const initialState = {
  judges: [
    {
      id: 0, 
      email: "ajudge@artvsart.com"
    }
  ]
}

const judgesReducer = (state=initialState, action) => {
  switch (action.type) {
    case "TOP_JUDGES_REQUEST":
      return {
        ...state,
        isFetching: true
      }
      
    case "TOP_JUDGES_RESPONSE":

      return {
        ...state, 
        topJudges: action.judges,
        isFetching: false
      }
      
    case "TOP_JUDGES_REQUEST_FAILED":
      return {
        ...state,
        isFetching: true,
        errors: action.errors 
      }
  }
  return state 
}

export default judgesReducer