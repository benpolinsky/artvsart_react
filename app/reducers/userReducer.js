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
        email: action.user.email
      }
    }
  }
  return state
}

export default userReducer