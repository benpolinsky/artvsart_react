import * as api from '../utils/ajaxHelpers.js'

export const fetchRankedUsers = (dispatch) => {
  return dispatch => {
    dispatch(requestRankedUsers());
    return api.get('ranked_users').then((response) => {
      if (response.errors == null) {
        dispatch(rankedUsersResponse(response.users))
      } else {
        dispatch(rankedUsersResponseFailed(response.errors))
      }
    });
  }
  
}

const requestRankedUsers = () => ({
  type: "REQUEST_RANKED_USERS"
});

const rankedUsersResponse = (users) => ({
  type: "RANKED_USERS_RESPONSE",
  users: users
});

const rankedUsersResponseFailed = (errors) => ({
  type: "RANKED_USERS_RESPONSE_FAILED",
  errors: errors
});