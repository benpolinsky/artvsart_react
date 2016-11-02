import * as api from '../utils/ajaxHelpers.js'

export const updateUserEmail = (params) => (dispatch) => {
  dispatch(startUpdateEmail())
  api.put('user', params).then(response => {
    if (response.errors == null) {
      dispatch(receiveUpdatedUser(response));
    } else {
      dispatch(updateUserFailed(response.errors));
    }
  })
}

export const updateUserPassword = (params) => (dispatch) => {
  dispatch(startUpdateEmail())
  api.put('user/change_password', {user: params}).then(response => {
    if (response.errors == null) {
      dispatch(receiveUpdatedUser(response));
    } else {
      dispatch(updateUserFailed(response.errors));
    }
  })
}

const startUpdateEmail = () => ({
  type: "START_UPDATE_EMAIL"
});

const receiveUpdatedUser = (response) => ({
  type: "RECEIVE_UPDATED_USER",
  user: response.user
});

const updateUserFailed = (errors) => ({
  type: "UPDATE_USER_FAILED",
  errors: errors
});