import React from 'react';
import {Router} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import AuthNav from './authNav.js';
import NavDrawer from './navDrawer.js';
import UserMenu from '../users/userMenu.js';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Radium from 'radium';
import {StyleRoot} from 'radium';
import menuStyles from '../../styles/navBar.js';

var body = document.getElementsByTagName("body")[0]; 
const fixBody = () => {
  body.style.position = 'fixed';
}

const unFixBody = () => {
  body.style.position = 'relative';
}



const RightElementIcon = ({user, showAuthForm, menu}) => {
  if (user.type == "GuestUser" || user.type == "BotUser"){
    return <AuthNav style={{height: '100%'}} showAuthForm={showAuthForm}/>  
  } else {
    return <UserMenu 
      menuStyles={menuStyles.userMenu} 
      wrapperStyles={menuStyles.userMenuWrapper}
      menu={menu} 
      user={user}
    />  
  }
}


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
  
  
  toggleNav(open){
    open ? fixBody() : unFixBody();
    this.setState({
      navMenuOpen: open
    })
  }
  
  openMenu(){
    this.toggleNav(true)
  
  }
  
  closeMenu(){
    this.toggleNav(false)
  }

  render(){
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
          iconElementRight={
            <RightElementIcon 
            menu={this.state.menu} 
            user={this.props.user} 
            showAuthForm={this.props.showAuthForm}
            />
          }
        />

        <NavDrawer 
          open={this.state.navMenuOpen} 
          admin={this.props.user.type} 
          closeMenu={this.closeMenu} 
          onRequestChange={(open) => this.toggleNav(open)} 
        />

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
