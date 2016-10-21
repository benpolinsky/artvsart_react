import React from 'react';
import Radium from 'radium';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {StyleRoot} from 'radium'
// const myMenu = Radium(DropDownMenu)
const AdminMenu = ({menuStyles, wrapperStyles, selectMenuItem, menu, user_email}) => {
  return (
    <MuiThemeProvider>
      <StyleRoot>
        <div style={wrapperStyles}>
        <DropDownMenu style={menuStyles} onChange={selectMenuItem} value={menu} labelStyle={{color: 'black', borderBottom: 0, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis'}} >
          <MenuItem value='email' primaryText={`${user_email}`} />
          <MenuItem value='profile' primaryText="Your Profile" />
          <MenuItem value='sign_out' primaryText="Sign Out" />
        </DropDownMenu>
        </div>
      </StyleRoot>
    </MuiThemeProvider>
  )
}

export default Radium(AdminMenu)