import React from 'react'
import Styles from '../../styles/buttons.js'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const mainButton = ({action, label}) => {
  return(
    <MuiThemeProvider>
      <FlatButton 
        onTouchTap={action} 
        style={Styles} 
        labelStyle={Styles.label} 
        hoverColor={Styles.hoverColor}
        backgroundColor={Styles.backgroundColor}
        label={label}
 />
    </MuiThemeProvider>
  )
}

export default mainButton