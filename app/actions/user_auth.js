import * as api from '../utils/ajax_helpers.js';
import * as storage from '../localStorage.js'

//  User Registration and Auth Actions
export const signUserIn = (user, router) => (dispatch) => {
  dispatch(startSignUserIn(user));
  return api.signIn(user).then(response => {
    if (response.errors != null) {
      console.log(response)
      dispatch(signInUserFailed(response.errors)); 
    } else {
      dispatch(signInUserSuccessful(response.user));
      router.push('/profile');
      dispatch(storeUserCredentials(response.user));
    }
  })
}

export const handleCompetitionModal = (result, router) => (dispatch) => {
  if (result == "SIGN UP") {
    router.push('/sign_up');      
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
  return api.signOut().then(response => {
    console.log(response)
    dispatch(userSignedOut(response.guest_user));
    router.push('/');

  })
}

const userSignedOut = (user) => ({
  type: "USER_SIGNED_OUT",
  user: user
})

export const registerUser = (user, router) => (dispatch) => {
  dispatch(startRegisterUser(user));
  return api.registerUser(user).then(response => {
    if (response.errors != null) {
      console.log(response)
      dispatch(registerUserFailed(response.errors));
    } else {
      dispatch(registerUserSuccessful(response.user));
      router.push(`/competition`);
      dispatch(storeUserCredentials(response.user));
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
  return api.getToken().then(response => {
    return response
  })
}

export const storeUserCredentials = (user) => (dispatch) => {
  storage.storeToken(user.auth_token);
  dispatch(receiveUserInfo(user));
}

export const receiveUserInfo = (user) => ({
  type: "RECEIVE_USER_INFO",
  user: user
});

export const getUserInfo = () => (dispatch) => {
  return api.userInfo().then(response => {
    dispatch(receiveUserInfo(response.user));
  })
}
