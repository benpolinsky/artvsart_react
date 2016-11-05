import * as api from '../utils/ajaxHelpers.js'
import * as storage from '../utils/localStorage.js'
import { SubmissionError } from 'redux-form'
import {openModal, closeModal, closeAppLoader, openAppLoader, displayNotice} from './app.js'

export const loginToFacebook = (response) => (dispatch) => {
  dispatch(facebookAuthRequest(response));
  dispatch(openAppLoader())
  api.get('users/auth/facebook/callback').then(response => {
    if (response.errors == null) {
      dispatch(facebookAuthSuccess(response));
      dispatch(storeUserCredentials(response.user));
      dispatch(closeSignUp());
      dispatch(signInUserSuccessful(response.user));  
    } else {
      dispatch(facebookAuthFailed());
      dispatch(registerUserFailed(response.errors))
    }
    dispatch(closeAppLoader())
  })
}

const facebookAuthFailed = () => ({
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

export const loginToGithub = (response) => (dispatch) => {
  api.get('users/auth/github/callback').then(response => {
    console.log(response)
  })
}

export const signUserIn = (user, router) => (dispatch) => {
  dispatch(startSignUserIn(user));
  return api.post('users/sign_in', user).then(response => {
    if (response.errors != null) {
      dispatch(signInUserFailed(response.errors)); 
    } else {
      dispatch(storeUserCredentials(response.user));
      dispatch(signInUserSuccessful(response.user));
      dispatch(closeSignUp())
      dispatch(closeModal())
      router.push('/profile');
      
    }
  })
}

export const handleCompetitionModal = (result="") => (dispatch) => {
  switch (result) {
  case "SIGN UP WITH EMAIL":
    dispatch(openSignUp('register'));    
    break;
  default:
    dispatch(closeModal())
    break;
  }
  dispatch(closeCompetitionModal());
}

const closeCompetitionModal = () => ({
  type: "CLOSE_COMPETITION_MODAL"
})

export const openSignUp = (formType) => (dispatch) => {
  dispatch(triggerSignUp(formType));
  dispatch(openModal());
}

const triggerSignUp = (formType) => ({
  type: "OPEN_SIGN_UP",
  formType: formType
})

export const closeSignUp = () => (dispatch) =>{
  dispatch(triggerClose())
  dispatch(closeModal())
}

const triggerClose = () => ({
  type: "CLOSE_SIGN_UP"
})

const startSignUserIn = (user) => ({
  type: "START_SIGN_USER_IN",
  user: user
})

const signInUserFailed = (user) => ({
  type: "SIGN_IN_USER_FAILED",
  errors: user
})

const signInUserSuccessful = (user) => ({
  type: "SIGN_IN_USER_SUCCESSFUL",
  user: user
})

export const signOutUser = (router) => (dispatch) => {
  storage.deleteToken();
  dispatch(startUserSignedOut());
  return api.destroy('users/sign_out').then(response => {

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
   api.post('users', {user: user}).then(response => {
    if (response.errors != null) {
      dispatch(registerUserFailed(response.errors));
      
    } else {
      dispatch(registerUserSuccessful(response.user));
      dispatch(pendingEmailConfirmation(response.user))
      
      router.push(`/user/pending_confirmation`);
      dispatch(storeUserCredentials(response.user));
      dispatch(closeSignUp())

    }
  })
}

const pendingEmailConfirmation = (user) => ({
  type: "PENDING_EMAIL_CONFIRMATION",
  user: user
})

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
  return api.get('').then(response => {
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
  return api.get('').then(response => {
    dispatch(receiveUserInfo(response.user));
    dispatch(closeAppLoader())
    dispatch(storeUserCredentials(response.user));
  })
  .catch((error) => {
    if (error.message == "Failed to fetch"){
      dispatch(apiDown(error))
    } else {
      console.log("An error occurred: ", error.message)
    }
    
  });
}

export const apiDown = (error) => ({
  type: "API_DOWN",
  error: error
})

const startReceiveUserInfo = () => ({
  type: "START_RECEIVE_USER_INFO"
})


export const confirmUserAccount = (token, router) => (dispatch) => {
  dispatch(startConfirmUserAccount());
  return api.get(`users/confirmation?confirmation_token=${token}`).then(response => {
    if (response.errors == null){
      dispatch(userAccountConfirmed(response));
      dispatch(storeUserCredentials(response.user));
      dispatch(signInUserSuccessful(response.user));
      router.push('/competition');
    } else {
      dispatch(confirmUserAccountFailed(response));
      router.push('/competition');
    }
  });
}

const startConfirmUserAccount = () => ({
  type: "START_CONFIRM_USER_ACCOUNT"
});

const userAccountConfirmed = (response) => ({
  type: "USER_ACCOUNT_CONFIRMED",
  user: response.user
});

const confirmUserAccountFailed = (response) => ({
  type: "CONFIRM_USER_ACCOUNT_FAILED",
  errors: response.errors
});



export const forgotPassword = (data) => (dispatch) => {
  dispatch(startResetPassword());
  const params = api.toParams(data);
  return api.get(`users/password/new?${params}`).then(response => {
    if (response.errors == null) {
      dispatch(receiveResetPassword(response));      
    } else {
      dispatch(receiveResetPasswordError(response.errors))
    }
  });
}

const startResetPassword = () => ({
  type: "START_RESET_PASSWORD"
});

const receiveResetPassword = (response) => ({
  type: "RECEIVE_RESET_PASSWORD_INSTRUCTIONS",
  notice: response.notice
});

const receiveResetPasswordError = (errors) => ({
  type: "RECEIVE_RESET_PASSWORD_ERROR",
  errors: errors
});


export const submitNewPassword = (data, router) => (dispatch) => {
  dispatch(startSubmitNewPassword());
  return api.put('users/password', {user: data}).then(response => {
    if (response.errors == null) {
      dispatch(submitNewPasswordAccepted(response.user));
      dispatch(storeUserCredentials(response.user));
      router.push(`/competition`);
      dispatch(displayNotice(response.notice));
    } else {
      dispatch(submitNewPasswordFailed(response.errors))
    }
  })
}

const startSubmitNewPassword = () => ({
  type: "START_SUBMIT_NEW_PASSWORD"
});

const submitNewPasswordAccepted = (response) => ({
  type: "SUBMIT_NEW_PASSWORD_ACCEPTED",
  user: response
});

const submitNewPasswordFailed = (response) => ({
  type: "SUBMIT_NEW_PASSWORD_FAILED",
  errors: response
})

