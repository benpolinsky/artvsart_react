import React from 'react'
import {connect} from 'react-redux'
import FacebookLogin from 'react-facebook-login';
import {loginToFacebook} from '../../actions/userAuth.js';

const facebookButton = ({responseFacebook, label="Sign Up With Facebook", restoring}, context) => {
  return(
    <FacebookLogin
      appId={process.env.FACEBOOK_APP_ID}
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook.bind(this, context.router, restoring)}
      icon="fa-facebook"
      cssClass='kep-login-facebook'
      cookie={true}
      textButton={label}
      size='small'
    />
  )
}

facebookButton.contextTypes = {
  router: React.PropTypes.object
}

const mapDispatchToProps = (dispatch) => ({
  responseFacebook(router, restoring, response){
    dispatch(loginToFacebook(response, router, restoring));
  }
})

export default connect(null, mapDispatchToProps)(facebookButton)
