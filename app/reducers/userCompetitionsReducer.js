const initialState = {
  isFetching: false,
  userCompetitions: 0
}

const userCompetitionsReducer = (state=initialState, action) => {
  switch (action.type) {
    case "USER_COMPETITIONS_REQUEST":
      return {
        ...state,
        isFetching: true
      }
      
    case "USER_COMPETITIONS_RESPONSE":
      return {
        ...state, 
        userCompetitions: action.competitions,
        isFetching: false
      }
      
    case "USER_COMPETITIONS_REQUEST_FAILED":
      return {
        ...state,
        isFetching: true,
        errors: action.errors 
      }
  }
  return state 
}

export default userCompetitionsReducer