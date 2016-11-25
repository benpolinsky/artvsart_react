import React from 'react';
import {Link} from 'react-router';
import Radium, {StyleRoot} from 'radium';
import Drawer from 'material-ui/Drawer';
import DrawerStyles from '../../styles/navDrawer.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const RadiumLink = Radium(Link)

const NavDrawer = ({open, closeMenu, onRequestChange, admin=false}) => {
  return (
    <MuiThemeProvider>
    <Drawer docked={false} open={open} onRequestChange={onRequestChange}>
      <h1 style={DrawerStyles.heading}>ART VS ART</h1>
     <StyleRoot>
      <RadiumLink style={DrawerStyles.links} onClick={closeMenu} to="/competition">Competition</RadiumLink>
      <RadiumLink style={DrawerStyles.links} onClick={closeMenu} to="/leaderboard">Leaderboard</RadiumLink>
      <RadiumLink style={DrawerStyles.links} onClick={closeMenu} to="/top_judges">Top Judges</RadiumLink>
      <RadiumLink style={DrawerStyles.links} onClick={closeMenu} to="/about">About</RadiumLink>
       {admin == "admin" &&
          <div className='adminRadiumLinks'>
            <RadiumLink style={DrawerStyles.links} onClick={closeMenu} to="/art/new"> Add Art</RadiumLink>
            <RadiumLink style={DrawerStyles.links} onClick={closeMenu} to="/art"> All Art</RadiumLink>
            <RadiumLink style={DrawerStyles.links} onClick={closeMenu} to='/import_art'>Import Art</RadiumLink>
            <RadiumLink style={DrawerStyles.links} onClick={closeMenu} to='/categories'>Categories</RadiumLink>
            <RadiumLink style={DrawerStyles.links} onClick={closeMenu} to='/categories/new'>Add Category</RadiumLink>
          </div>
        }
      </StyleRoot>
    </Drawer>
    </MuiThemeProvider>
    )
}

export default Radium(NavDrawer);