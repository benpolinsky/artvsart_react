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
    errors: {
    },
    identities: []
  }
}


const userReducer = (state=initialUserState, action) => {
  switch (action.type) {

  case "START_UPDATE_EMAIL":
  case "START_CONFIRM_USER_ACCOUNT":
  case "START_RECEIVE_USER_INFO":
  case "START_RESET_PASSWORD":
    return {
      ...state,
      user: {
        ...state.user,
        fetching: true
      }
    }
  case "RECEIVE_USER_INFO":
  case "REGISTER_USER_SUCCESSFUL":
  case "RECEIVE_UPDATED_USER":
  case "SIGN_IN_USER_SUCCESSFUL":
    return {
      ...state,
      user: {
        ...state.user,
        ...action.user,
        authenticated: true,
        fetching: false
      }
    }
  case "PENDING_EMAIL_CONFIRMATION": 
    return {
      ...state,
      user: {
        ...state.user,
        ...action.user,
        confirmed: 'pending'
      }
    }
  case "USER_ACCOUNT_CONFIRMED":
    return {
      ...state,
      user: {
        ...state.user,
        ...action.user,
        confirmed: 'true'
      }
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
        authenticated: false,
        fetching: true
      }
    }
    
  case "USER_SIGNED_OUT":
    return {
      ...state,
      user: {
        ...state.user,
        email: action.user.email,
        type: action.user.type,
        token: action.user.auth_token,
        authenticated: true,
        fetching: false
      }
    }
  case "UPDATE_USER_FAILED":
    return {
      ...state,
      user: {
        ...state.user,
        errors: action.errors,
        fetching: false
      }
    }  
  case 'SIGN_IN_USER_FAILED':
    var errors = [];

    if (typeof action.errors == "string") {
      return {
        ...state,
        errors: {
          email: "Invalid Email or Password!"
        },
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
      errors: {
        email: errors.join(", ")
      },
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
    return {...state, user: {...state.user, fetching: false, openForm: ''}}
  }
  return state
}

export default userReducer