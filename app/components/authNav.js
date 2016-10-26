import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import menuStyles from '../styles/navBar.js'

const AuthNav = ({showAuthForm}) => {
  return(
    <ul style={menuStyles.authNav}>
      <li style={menuStyles.authNavListItem}>
        <MuiThemeProvider>
          <FlatButton style={menuStyles.authNavListLink} labelStyle={menuStyles.label} label="Register" onClick={() => {showAuthForm('register')}} />
        </MuiThemeProvider> 
      </li>
      <li style={menuStyles.authNavListItem}>
        <MuiThemeProvider>
          <FlatButton style={menuStyles.authNavListLink} labelStyle={menuStyles.label} label="Sign In" onClick={() => {showAuthForm('signIn')}} />
        </MuiThemeProvider> 
      </li>
    </ul>
  )
}

AuthNav.propTypes = {
  showAuthForm: React.PropTypes.func.isRequired
}

export default AuthNav