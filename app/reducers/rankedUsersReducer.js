const initialRankedUsersState = {
  users: [
    {id: 0, email: '', gravatar_hash: '', rank: 0}
  ],
  isFetching: false
}

const rankedUsersReducer = (state=initialRankedUsersState, action) => {
  switch (action.type) {
  case "REQUEST_RANKED_USERS":
    return {
      ...state, 
      isFetching: true
    }
  case "RANKED_USERS_RESPONSE":
    return {
      ...state, 
      isFetching: false,
      users: action.users
    }   
  case "RANKED_USERS_RESPONSE_FAILED":
    return {
      ...state, 
      isFetching: false
    }
  }
  return state
}

export default rankedUsersReducer