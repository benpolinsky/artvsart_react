import * as api from '../utils/ajaxHelpers.js';
import * as storage from '../localStorage.js'

export const loginToFacebook = (response) => (dispatch) => {
  dispatch(facebookAuthRequest(response));
  api.facebookLogin(response).then(response => {
    if (response.errors == null) {
      dispatch(facebookAuthSuccess(response));
      dispatch(storeUserCredentials(response.user));
      dispatch(closeSignUp());
      dispatch(signInUserSuccessful(response.user));
      
    } else {
      dispatch(facebookAuthFailed(response.errors));
    }
  })
}

const facebookAuthFailed = (errors) => ({
  type: "FACEBOOK_AUTH_FAILED"
});

const facebookAuthRequest = (errors) => ({
  type: "FACEBOOK_AUTH_REQUEST_START",
  errors: errors
})

const facebookAuthSuccess = (response) => ({
  type: "FACEBOOK_AUTH_SUCCESS",
  response: response
})

export const signUserIn = (user, router) => (dispatch) => {
  dispatch(startSignUserIn(user));
  return api.signIn(user).then(response => {
    if (response.errors != null) {
      dispatch(signInUserFailed(response.errors)); 
    } else {
      dispatch(storeUserCredentials(response.user));
      dispatch(signInUserSuccessful(response.user));
      dispatch(closeSignUp())
      router.push('/profile');
      
    }
  })
}

export const handleCompetitionModal = (result, router) => (dispatch) => {
  if (result == "SIGN UP") {
    dispatch(openSignUp('register'));    
  } 
  dispatch(closeCompetitionModal());
}

const closeCompetitionModal = () => ({
  type: "CLOSE_COMPETITION_MODAL"
})

const startSignUserIn = (user) => ({
  type: "START_SIGN_USER_IN",
  user: user
})

const signInUserFailed = (user) => ({
  type: "SIGN_IN_USER_FAILED",
  user: user
})

const signInUserSuccessful = (user) => ({
  type: "SIGN_IN_USER_SUCCESSFUL",
  user: user
})

export const signOutUser = (router) => (dispatch) => {
  storage.deleteToken();
  dispatch(startUserSignedOut());
  return api.signOut().then(response => {

    dispatch(storeUserCredentials(response.guest_user));
    dispatch(userSignedOut(response.guest_user));
    router.push('/');

  })
}

const startUserSignedOut = (user) => ({
  type: "START_USER_SIGNED_OUT",
  user: user
})

const userSignedOut = (user) => ({
  type: "USER_SIGNED_OUT",
  user: user
})

export const registerUser = (user, router) => (dispatch) => {
  dispatch(startRegisterUser(user));
  return api.registerUser(user).then(response => {
    if (response.errors != null) {

      dispatch(registerUserFailed(response.errors));
    } else {
      dispatch(registerUserSuccessful(response.user));
      dispatch(storeUserCredentials(response.user));
      dispatch(closeSignUp())
      router.push(`/competition`);

    }
  })
}

const startRegisterUser = (user) => ({
  type: "START_REGISTER_USER",
  user: user
})

const registerUserSuccessful = (user) => ({
  type: "REGISTER_USER_SUCCESSFUL",
  user: user
})

const registerUserFailed = (user) => ({
  type: "REGISTER_USER_FAILED",
  errors: user
})

export const loadCredentials = (next_action) => (dispatch) => {
  dispatch(requestNewToken());
  return api.getToken().then(response => {
    dispatch(storeUserCredentials(response.user));
  })
}

export const storeUserCredentials = (user) => (dispatch) => {
  dispatch(startStoreUserCredentials());
  storage.storeToken(user);
}

const startStoreUserCredentials = () => ({
  type: "START_STORE_USER_CREDENTIALS"
})

const requestNewToken = () => ({
  type: "REQUEST_NEW_TOKEN"
})

export const receiveUserInfo = (user) => ({
  type: "RECEIVE_USER_INFO",
  user: user
});

export const getUserInfo = () => (dispatch) => {
  dispatch(startReceiveUserInfo());
  return api.userInfo().then(response => {
    dispatch(receiveUserInfo(response.user));
    dispatch(storeUserCredentials(response.user));
  })
}

const startReceiveUserInfo = () => ({
  type: "START_RECEIVE_USER_INFO"
})

export const openSignUp = (formType) => ({
  type: "OPEN_SIGN_UP",
  formType: formType
})

export const closeSignUp = () => ({
  type: "CLOSE_SIGN_UP"
})

