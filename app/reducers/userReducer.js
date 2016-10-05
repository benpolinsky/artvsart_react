const initialUserState = {
  user: {
    email: "",
    type: "",
    token: "",
    authenticated: false,
    fetching: false,
    admin: false
  }
}

const userReducer = (state=initialUserState, action) => {
  switch (action.type) {
  case "FACEBOOK_AUTH_REQUEST_START": 
    return state
  case "FACEBOOK_AUTH_SUCCESS": 
    return state
  case "FACEBOOK_AUTH_FAILED": 
    return state
  case "START_RECEIVE_USER_INFO":
    return {
      ...state,
      user: {
        email: "",
        type: "",
        token: "",
        authenticated: false,
        fetching: true
      }
    }
  case "RECEIVE_USER_INFO":
    return {
      ...state,
      user: {
        email: action.user.email,
        type: action.user.type,
        token: action.user.auth_token,
        authenticated: true,
        fetching: false
      }
    }
  case "START_USER_SIGNED_OUT":
    return {
      ...state,
      user: {
        email: "",
        type: "GuestUser",
        token: "",
        authenticated: false
      }
    }
    
  case "USER_SIGNED_OUT":
    return {
      ...state,
      user: {
        email: action.user.email,
        type: action.user.type,
        token: action.user.auth_token,
        authenticated: true
      }
    }
  case 'REGISTER_USER_FAILED':
    let errors = [];
    for (var key of Object.keys(action.errors)) {
      action.errors[key].forEach((item) => errors.push(item));
    }
    return {
      ...state,
      errors: errors
    }
  case "REGISTER_USER_SUCCESSFUL":
    return {
      ...state,
      user: {
        email: action.user.email,
        type: action.user.type,
        token: action.user.auth_token,
        authenticated: true
      }
    }
  case "SIGN_IN_USER_SUCCESSFUL":
    return {
      ...state,
      user: {
        email: action.user.email,
        type: action.user.type,
        token: action.user.auth_token,
        authenticated: true
      }
    }
    
  }
  return state
}

export default userReducer