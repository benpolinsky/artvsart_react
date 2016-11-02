import React from 'react'
import {connect} from 'react-redux'
import AuthForm from './authForm.js'
import {closeSignUp, registerUser, signUserIn, loginToFacebook} from '../../actions/userAuth.js';
import MyOverlay from '../myOverlay.js'

const AuthForms = ({user, errors, responseFacebook, signUserIn, registerUser, hideAuthForm}) => {
  return(
    <div>
      <AuthForm errors={errors} displayForm={user.openForm} formType="register" form="RegisterForm" formTitle="Register" responseFacebook={responseFacebook} formAction={registerUser} />
      <AuthForm errors={errors} displayForm={user.openForm} formType="signIn" form="SignInForm" formTitle="Sign In" responseFacebook={responseFacebook} formAction={signUserIn} />
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
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(AuthForms)