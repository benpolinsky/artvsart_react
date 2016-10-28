import React from 'react'
import PromptToSignUp from './promptToSignUp';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Errors = ({errors, actions, closeAction}) => {
  return (
    <div>Errors</div>
  )
}

export default Errors

// <PromptToSignUp
//   errors={this.props.competition.errors}
//   open={!this.props.competition.closeModal}
//   handleClose={this.signUp}
// />