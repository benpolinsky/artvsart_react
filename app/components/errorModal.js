import React from 'react';
import Radium from 'react';
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import EmailIcon from 'material-ui/svg-icons/communication/email'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FacebookLogin from 'react-facebook-login';
import {loginToFacebook} from '../actions/userAuth.js'
import CompetitionStyles from '../styles/competition.js'


const ErrorModal = ({errors, open, handleClose, responseFacebook}) => {
  const actions = [
    <FacebookLogin
      appId="1118634491523505"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      icon="fa-facebook"
      cssClass='kep-login-facebook'
      cookie
      textButton="Sign Up With Facebook"
      size='small'
    />,
    <FlatButton 
      style={CompetitionStyles.actions} 
      backgroundColor='black' 
      labelStyle={CompetitionStyles.actions.label} 
      hoverColor='black' 
      primary 
      label={"Sign Up With Email"} 
      icon={<EmailIcon color="white"/>}
      onTouchTap={handleClose}
    />,
    <FlatButton
      style={CompetitionStyles.actions} 
      backgroundColor='black' 
      labelStyle={CompetitionStyles.actions.label} 
      hoverColor='black' 
      label={"No Thanks..."} 
      onTouchTap={handleClose} 
    />
  ];
  return(
    <div>
      <MuiThemeProvider>
        <Dialog 
          contentStyle={CompetitionStyles.errorModal} 
          open={open} 
          actions={actions} 
          title="Oh No!"
          titleStyle={CompetitionStyles.errorModal.title}
          bodyStyle={CompetitionStyles.errorModal.body}
          onRequestClose={handleClose}
          >
          {errors}
        </Dialog>
      </MuiThemeProvider>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  responseFacebook(response){
    dispatch(loginToFacebook(response));
  }
})

export default connect(null, mapDispatchToProps)(ErrorModal)