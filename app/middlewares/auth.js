// 1. We intercept each action
// 2. If there's a token in our store/cookies/state, great, let's proceed
// 3. If there's no token, we make a call to fetch current user
// 4. It'll respond with a guest token
// 5. We store it in our store/cookies/state

import * as storage from '../localStorage.js'
import {loadCredentials} from '../actions/index.js'

export const auth = store => next => action => {
  if (storage.loadToken() === undefined) {
    store.dispatch(loadCredentials(action)).then(response => {
      storage.storeToken(response.user.auth_token);
      console.log(response.user.auth_token);
      return next(action);
    })
  } else{
    return next(action);
  }
}