import React from 'react'
import {connect} from 'react-redux'
import AuthForm from './authForm.js'
import ForgotPasswordForm from './forgotPasswordForm.js'
import {closeSignUp, registerUser, signUserIn, loginToFacebook, openSignUp, forgotPassword} from '../../actions/userAuth.js';
import MyOverlay from '../myOverlay.js'

const AuthForms = ({user, errors, responseFacebook, signUserIn, registerUser, hideAuthForm, showAuthForm, requestPasswordReset}) => {
  return(
    <div>
      <AuthForm showAuthForm={showAuthForm} errors={errors} displayForm={user.openForm} formType="register" form="RegisterForm" formTitle="Register" responseFacebook={responseFacebook} formAction={registerUser} />
      <AuthForm showAuthForm={showAuthForm} errors={errors} displayForm={user.openForm} formType="signIn" form="SignInForm" formTitle="Sign In" responseFacebook={responseFacebook} formAction={signUserIn} />
      <ForgotPasswordForm showAuthForm={showAuthForm} displayForm={user.openForm} form="forgotPasswordForm" formType="forgotPassword" formAction={requestPasswordReset}/>
      <MyOverlay close={hideAuthForm} show={user.openForm} /> 
    </div>
  )
}


AuthForms.propTypes = {
  user: React.PropTypes.object.isRequired,
  errors: React.PropTypes.array,
  hideAuthForm: React.PropTypes.func.isRequired,
  registerUser: React.PropTypes.func.isRequired,
  signUserIn: React.PropTypes.func.isRequired,
  responseFacebook: React.PropTypes.func.isRequired
}

const mapStateToProps = (store) => ({
  user: store.userState.user,
  errors: store.userState.errors
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
  },
  showAuthForm(formType){
    dispatch(openSignUp(formType))
  },
  requestPasswordReset(data){
    dispatch(forgotPassword(data))
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(AuthForms)