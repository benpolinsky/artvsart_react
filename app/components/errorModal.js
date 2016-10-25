import React from 'react';
import Dialog from 'material-ui/Dialog';
import MainButton from './elements/mainButton.js';
import FacebookButton from './elements/facebookButton.js';
import EmailIcon from 'material-ui/svg-icons/communication/email'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CompetitionStyles from '../styles/competition.js'


const ErrorModal = ({errors, open, handleClose, responseFacebook}) => {
  const actions = [
    <FacebookButton />,
    <MainButton label="Sign Up With Email" action={handleClose} />,
    <MainButton label="No Thanks..." action={handleClose} />
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

export default ErrorModal