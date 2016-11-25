import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ArtButton from '../elements/button.js';
import menuStyles from '../../styles/navBar.js';

const AuthNav = ({showAuthForm}) => {
  return(
    <ul style={menuStyles.authNav}>
      <li style={menuStyles.authNavListItem}>
        <ArtButton 
          kind="small"
          label="Register"
          action={() => {showAuthForm('register')}} 
          />
      </li>
      <li style={menuStyles.authNavListItem}>
        <ArtButton 
          kind="small"
          label="Sign In"
          action={() => {showAuthForm('signIn')}} 
          />
      </li>
    </ul>
  )
}

AuthNav.propTypes = {
  showAuthForm: React.PropTypes.func.isRequired
}

export default AuthNav