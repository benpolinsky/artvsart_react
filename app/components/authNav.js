import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

const AuthNav = ({showAuthForm}) => {
  return(
    <ul className='authNav'>
      <li className="nav-item">
        <MuiThemeProvider>
          <FlatButton className="nav-link" label="Register" onTouchTap={() => {showAuthForm('register')}} />
        </MuiThemeProvider> 
      </li>
      <li className="nav-item">
      <span> | </span>
      </li>
      <li className="nav-item">
        <MuiThemeProvider>
          <FlatButton className="nav-link" label="Sign In" onTouchTap={() => {showAuthForm('signIn')}} />
        </MuiThemeProvider> 
      </li>
    </ul>
  )
}

AuthNav.propTypes = {
  showAuthForm: React.PropTypes.func.isRequired
}

export default AuthNav