import * as storage from '../localStorage.js'
import {loadCredentials, storeUserCredentials, getUserInfo} from '../actions/user_auth.js'

let receivingUserInfo = false;

export const auth = store => next => action => {
    const token = storage.loadToken();

    if (action.type == "USER_SIGNED_OUT"){
      return next(action)
      
    } 
    else if (token === undefined || token == "" ) {
      
      let next_action = next(action);
      store.dispatch(loadCredentials(action)).then(response => {
        store.dispatch(storeUserCredentials(response.user));
        return next_action;
      });
      
    } 
    else {
      
      if (store.getState().userState.user.email == "" && !receivingUserInfo ){
        receivingUserInfo = true;
        store.dispatch(getUserInfo()).then(response => next(action));
      } 
      else {
        return next(action);
      }
      
    }  
}