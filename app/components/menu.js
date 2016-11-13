import React from 'react';
import {Link} from 'react-router';
import {Router} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import AuthNav from './authNav.js'
import UserMenu from './users/userMenu.js'
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import Radium from 'radium'
import {StyleRoot} from 'radium'
import menuStyles from '../styles/navBar.js'
import DrawerStyles from '../styles/navDrawer.js'


var RadiumLink = Radium(Link)

class Menu extends React.Component{
  constructor(){
    super();
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  
  componentWillMount(){
    this.state = {
      menu: 'email',
      admin: "addNewArt",
      navMenuOpen: false
    }
  }
  
  openMenu(){
    this.setState({
      navMenuOpen: true
    })
  }
  
  closeMenu(){
    this.setState({
      navMenuOpen: false
    })
  }

  render(){
    const rightElementIcon = (this.props.user.type == "GuestUser" || this.props.user.type == "BotUser")
              ?
            <AuthNav style={{height: '100%'}} showAuthForm={this.props.showAuthForm}/>
              : 
            <UserMenu 
              menuStyles={menuStyles.userMenu} 
              wrapperStyles={menuStyles.userMenuWrapper}
              menu={this.state.menu} 
              user={this.props.user}
            /> 
    return (
    <MuiThemeProvider>
      <header style={{height: 64}}>
        <AppBar 
          style={menuStyles.appBar} 
          title="ART VS ART"
          titleStyle={menuStyles.appBarHeading}
          onLeftIconButtonTouchTap={this.openMenu}
          iconStyleRight={{marginTop: 0, height: '100%'}}
          iconStyleLeft={menuStyles.appBarIcon}
          iconElementLeft={<IconButton><MenuIcon color='black'/></IconButton>}
          iconElementRight={rightElementIcon}
        />
       
          <Drawer docked={false} open={this.state.navMenuOpen} onRequestChange={(open) => this.setState({navMenuOpen: open})}>
            <h1 style={DrawerStyles.heading}>ART VS ART</h1>
           <StyleRoot>
            <RadiumLink style={DrawerStyles.links} onClick={this.closeMenu} to="/competition">Competition</RadiumLink>
            <RadiumLink style={DrawerStyles.links} onClick={this.closeMenu} to="/leaderboard">Leaderboard</RadiumLink>
            <RadiumLink style={DrawerStyles.links} onClick={this.closeMenu} to="/top_judges">Top Judges</RadiumLink>
            <RadiumLink style={DrawerStyles.links} onClick={this.closeMenu} to="/about">About</RadiumLink>
             {this.props.user.type == "admin" &&
                <div className='adminRadiumLinks'>
                  <RadiumLink style={DrawerStyles.links} onClick={this.closeMenu} to="/art/new"> Add Art</RadiumLink>
                  <RadiumLink style={DrawerStyles.links} onClick={this.closeMenu} to="/art"> All Art</RadiumLink>
                  <RadiumLink style={DrawerStyles.links} onClick={this.closeMenu} to='/import_art'>Import Art</RadiumLink>
                  <RadiumLink style={DrawerStyles.links} onClick={this.closeMenu} to='/categories'>Categories</RadiumLink>
                  <RadiumLink style={DrawerStyles.links} onClick={this.closeMenu} to='/categories/new'>Add Category</RadiumLink>
                </div>
              }
            </StyleRoot>
          </Drawer>

      </header>
    
    </MuiThemeProvider>
    )
  }
  
};




Menu.contextTypes = {
  router: React.PropTypes.object
}

Menu.propTypes = {
  user: React.PropTypes.object.isRequired,
  showAuthForm: React.PropTypes.func.isRequired
}

export default Radium(Menu);
