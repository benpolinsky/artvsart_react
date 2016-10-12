import React from 'react'
import {connect} from 'react-redux'
import AuthForm from './authForm.js'
import {closeSignUp, registerUser, signUserIn, loginToFacebook} from '../../actions/userAuth.js';
import MyOverlay from '../myOverlay.js'

const AuthForms = ({user, responseFacebook, signUserIn, registerUser, hideAuthForm}) => {
  return(
    <div>
      <AuthForm displayForm={user.openForm} formType="register" formTitle="Register" responseFacebook={responseFacebook} formAction={registerUser} />
      <AuthForm displayForm={user.openForm} formType="signIn" formTitle="Sign In" responseFacebook={responseFacebook} formAction={signUserIn} />
      <MyOverlay close={hideAuthForm} show={user.openForm} /> 
    </div>
  )
}


const mapStateToProps = (store) => ({
  user: store.userState.user
})

const mapDispatchToProps = (dispatch) => ({
  hideAuthForm(){
    dispatch(closeSignUp())
  },
  registerUser(user, router){
    dispatch(registerUser(user, router));
  },
  signUserIn(user, router){
    dispatch(signUserIn(user, router));
  },
  responseFacebook(response){
    dispatch(loginToFacebook(response));
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(AuthForms)