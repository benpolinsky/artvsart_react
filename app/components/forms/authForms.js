import React from 'react'
import {connect} from 'react-redux'
import AuthForm from './authForm.js'
import ForgotPasswordForm from './forgotPasswordForm.js'
import {closeSignUp, registerUser, signUserIn, loginToFacebook, openSignUp, forgotPassword, loginToGithub} from '../../actions/userAuth.js';
import MyOverlay from '../myOverlay.js'
import {PopupCenter} from '../../utils/users.js'
import DefaultLoader from '../defaultLoader.js'

const AuthForms = ({user, errors, signUserIn, registerUser, hideAuthForm, showAuthForm, requestPasswordReset, openGithubWindow, fetching}) => {
  return(
    <DefaultLoader showing={fetching}>
      <AuthForm showAuthForm={showAuthForm} errors={errors} displayForm={user.openForm} formType="register" form="RegisterForm" formTitle="Register" formAction={registerUser} />
      <AuthForm showAuthForm={showAuthForm} errors={errors} displayForm={user.openForm} formType="signIn" form="SignInForm" formTitle="Sign In" formAction={signUserIn} />
      <ForgotPasswordForm showAuthForm={showAuthForm} displayForm={user.openForm} form="forgotPasswordForm" formType="forgotPassword" formAction={requestPasswordReset}/>
      <MyOverlay close={hideAuthForm} show={user.openForm} /> 
    </DefaultLoader>
  )
}


AuthForms.propTypes = {
  user: React.PropTypes.object.isRequired,
  errors: React.PropTypes.array,
  hideAuthForm: React.PropTypes.func.isRequired,
  registerUser: React.PropTypes.func.isRequired,
  signUserIn: React.PropTypes.func.isRequired,
  fetching: React.PropTypes.bool
}

const mapStateToProps = (store) => ({
  user: store.userState.user,
  errors: store.userState.errors,
  fetching: store.userState.fetching
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
  showAuthForm(formType){
    dispatch(openSignUp(formType))
  },
  requestPasswordReset(data){
    dispatch(forgotPassword(data))
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(AuthForms)