import React from 'react'
import {connect} from 'react-redux'
import FacebookLogin from 'react-facebook-login';
import {loginToFacebook} from '../../actions/userAuth.js';

const facebookButton = ({responseFacebook, label="Sign Up With Facebook"}) => {
  return(
    <FacebookLogin
      appId="1118634491523505"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      icon="fa-facebook"
      cssClass='kep-login-facebook'
      cookie
      textButton={label}
      size='small'
    />
  )
}

const mapDispatchToProps = (dispatch) => ({
  responseFacebook(response){
    dispatch(loginToFacebook(response));
  }
})

export default connect(null, mapDispatchToProps)(facebookButton)
