const initialUserState = {
  user: {
    email: "",
    gravatar_hash: "",
    type: "",
    token: "",
    authenticated: false,
    fetching: false,
    confirmed: 'false',
    admin: false,
    openForm: '',
    error: '',
    facebookRestoring: false,
    errors: [
      ],
    serverErrors: {
    },
    identities: []
  },
  fetching: false,
  errors: []
}


const userReducer = (state=initialUserState, action) => {
  switch (action.type) {

  case "START_REGISTER_USER":
  case "START_SIGN_USER_IN":
  case "START_UPDATE_EMAIL":
  case "START_CONFIRM_USER_ACCOUNT":
  case "START_RECEIVE_USER_INFO":
  case "START_RESET_PASSWORD":
  case "START_SUBMIT_NEW_PASSWORD":
  case "START_DELETE_CURRENT_USER":
    return {
      ...state,
      fetching: true,
      user: {
        ...state.user
      }
    }
  case "RECEIVE_USER_INFO":
  case "REGISTER_USER_SUCCESSFUL":
  case "RECEIVE_UPDATED_USER":
  case "SIGN_IN_USER_SUCCESSFUL":
  case "SUBMIT_NEW_PASSWORD_ACCEPTED":
    return {
      ...state,
      user: {
        ...state.user,
        ...action.user,
        authenticated: true
      },
      fetching: false
    }
  case "PENDING_EMAIL_CONFIRMATION": 
    return {
      ...state,
      user: {
        ...state.user,
        ...action.user,
        confirmed: 'pending'
      },
      fetching: false
    }
  case "USER_ACCOUNT_CONFIRMED":
    return {
      ...state,
      user: {
        ...state.user,
        ...action.user,
        confirmed: 'true'
      },
      fetching: false
    }
  case "START_USER_SIGNED_OUT":
    return {
      ...state,
      user: {
        ...state.user,
        email: "",
        type: "GuestUser",
        token: "",
        gravatar_hash: "",
        authenticated: false
      },
      fetching: true
    }
    
  case "USER_SIGNED_OUT":
  case "CURRENT_USER_DELETED":
    return {
      ...state,
      user: {
        ...state.user,
        email: action.user.email,
        type: action.user.type,
        token: action.user.auth_token,
        authenticated: true
      },
      fetching: false
    }
  case "CURRENT_USER_DELETE_FAILED":
  case "SUBMIT_NEW_PASSWORD_FAILED":
  case "UPDATE_USER_FAILED":
    return {
      ...state,
      user: {
        ...state.user,
        errors: action.errors
      },
      fetching: false
    }  
  case 'SIGN_IN_USER_FAILED':
    var errors = [];

    if (typeof action.errors == "string") {
      return {
        ...state,
        errors: ["Invalid Email or Password!"],
        fetching: false
      }
    }
    for (var key of Object.keys(action.errors)) {
      action.errors[key].forEach((item) => errors.push(item));
    }
    return {
      ...state,
      errors: errors,
      fetching: false
    }
  case 'REGISTER_USER_FAILED':
    var errors = [];
    for (var key of Object.keys(action.errors)) {
      action.errors[key].forEach((item) => errors.push(item));
    }
    return {
      ...state,
      errors: errors,
      fetching: false
    }
  case 'CONFIRM_USER_ACCOUNT_FAILED':
    var errors = [];
    for (var key of Object.keys(action.errors)) {
      action.errors[key].forEach((item) => errors.push(item));
    }
    return {
      ...state,
      errors: errors,
      fetching: false
    }
  case "OPEN_SIGN_UP":
    return {...state, user: {...state.user, openForm: action.formType}}
    
  case "CLOSE_SIGN_UP":
    return {...state, user: {...state.user, openForm: ''}}

  case "RECEIVE_RESET_PASSWORD_INSTRUCTIONS": 
    return {...state, fetching: false, user: {...state.user, openForm: ''}}
  case "FACEBOOK_RESTORING": 
    return {...state, fetching: false, user: {...state.user, facebookRestoring: true}}
  case "CLEAR_AUTH_FORM": 
    return {...state, fetching: false, errors: []}
  }
  
 
  return state
}

export default userReducer