import * as api from '../utils/ajaxHelpers.js';
import {displayNotice} from './app.js';
import {storeUserCredentials} from './userAuth.js';

export const updateUserEmail = (params) => (dispatch) => {
  dispatch(startUpdateEmail())
  api.put('user', {user: params}).then(response => {
    if (response.errors == null) {
      dispatch(receiveUpdatedUser(response));
      dispatch(displayNotice("Updated!"))
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
      dispatch(displayNotice("Updated!"))
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

export const deleteCurrentUser = (router) => (dispatch) => {
  dispatch(startDeleteCurrentUser());
  api.destroy('user').then(response => {
    if (response.errors == null) {
      dispatch(currentUserDeleted(response.user));
      dispatch(storeUserCredentials(response.user));
      router.push('/competition');
      dispatch(displayNotice(response.notice));
    } else {
      dispatch(currentUserDeleteFailed(resposne.errors))
    }
  })
};

const startDeleteCurrentUser = () => ({
  type: "START_DELETE_CURRENT_USER"
});

const currentUserDeleteFailed = (errors) => ({
  type: "CURRENT_USER_DELETE_FAILED",
  errors: errors
});

const currentUserDeleted = (newUser) => ({
  type: "CURRENT_USER_DELETED",
  user: newUser
});