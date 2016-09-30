const initialUserState = {
  user: {
    email: "",
    type: ""
  }
}

const userReducer = (state=initialUserState, action) => {
  switch (action.type) {
  case "RECEIVE_USER_INFO":
    return {
      ...state,
      user: {
        email: action.user.email,
        type: action.user.type
      }
    }
  case "USER_SIGNED_OUT":
    return {
      ...state,
      user: {
        email: action.user.email,
        type: action.user.type
      }
    }
  case 'REGISTER_USER_FAILED':
  let errors = [];
  for (var key of Object.keys(action.errors)) {
    action.errors[key].forEach((item) => errors.push(item));
  }
  console.log(action.errors)
    return {
      ...state,
      errors: errors
    }
  }
  return state
}

export default userReducer