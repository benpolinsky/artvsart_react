import React from 'react';

import MainButton from '../elements/mainButton.js';
import FacebookButton from '../elements/facebookButton.js';
import CompetitionStyles from '../../styles/competition.js';
import Dialog from 'material-ui/Dialog';
import EmailIcon from 'material-ui/svg-icons/communication/email'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



const PromptToSignUp = ({errors, open, handleClose, responseFacebook}) => {
  
  const actions = 
    (errors == "We don't have enough art for you to rank.  Check back soon!") ?
    null :
    [
      <FacebookButton />,
      <MainButton label="Sign Up With Email" action={handleClose} />,
      <MainButton label="No Thanks..." action={handleClose} />
    ]
  const closeAction = 
    (errors == "We don't have enough art for you to rank.  Check back soon!") ?
    null :
    handleClose
                  
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
          onRequestClose={closeAction}
          >
          {errors}
        </Dialog>
      </MuiThemeProvider>
    </div>
  )
}

export default PromptToSignUp