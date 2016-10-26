import React from 'react';
import {Link} from 'react-router';
import {Router} from 'react-router';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {signOutUser} from '../actions/userAuth.js'
import AuthNav from './authNav.js'
import AdminMenu from './adminMenu.js'
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
    this.selectMenuItem = this.selectMenuItem.bind(this);
  }
  
  componentWillMount(){
    this.state = {
      menu: 'email',
      admin: "addNewArt",
      navMenuOpen: false
    }
  }
  

  selectMenuItem(event, index, value){
    switch (value) {
    case 'profile':
      this.context.router.push(`/profile`);
      break;
    case 'sign_out':
      this.setState({menu: "Signing Out..."})
      this.props.signOutUser(this.context.router)
      break;      
    case 'addNewArt':
      this.context.router.push(`/art/new`);
      break;
    case 'importArt':
      this.context.router.push(`/import_art`);
      break;      
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
    const userType = this.props.user.type;
    const user_email = this.props.user.email
    return (
    <MuiThemeProvider>
      <div>
        <AppBar 
          style={menuStyles.appBar} 
          title="ART VS ART"
          titleStyle={menuStyles.appBarHeading}
          onLeftIconButtonTouchTap={this.openMenu}
          iconStyleRight={{marginTop: 0}}
          iconStyleLeft={menuStyles.appBarIcon}
          iconElementLeft={<IconButton><MenuIcon color='black'/></IconButton>}
          iconElementRight={
          
            userType == "GuestUser" 
              ?
            <AuthNav showAuthForm={this.props.showAuthForm}/>
              : 
            <AdminMenu 
              menuStyles={menuStyles.userMenu} 
              wrapperStyles={menuStyles.userMenuWrapper}
              selectMenuItem={this.selectMenuItem} 
              menu={this.state.menu} 
              user_email={user_email}
            /> 
          }
        />
       
          <Drawer docked={false} open={this.state.navMenuOpen} onRequestChange={(open) => this.setState({navMenuOpen: open})}>
            <h1 style={DrawerStyles.heading}>ART VS ART</h1>
           <StyleRoot>
            <RadiumLink style={DrawerStyles.links} onClick={this.closeMenu} to="/competition">Competition</RadiumLink>
            <RadiumLink style={DrawerStyles.links} onClick={this.closeMenu} to="/about">About</RadiumLink>
            <RadiumLink style={DrawerStyles.links} onClick={this.closeMenu} to="/leaderboard">Leaderboard</RadiumLink>
            <RadiumLink style={DrawerStyles.links} onClick={this.closeMenu} to="/top_judges">Top Judges</RadiumLink>
             {userType == "admin" &&
                <div className='adminRadiumLinks'>
                  <RadiumLink style={DrawerStyles.links} onClick={this.closeMenu} to="/art/new"> Add Art</RadiumLink>
                  <RadiumLink style={DrawerStyles.links} onClick={this.closeMenu} to='/import_art'>Import Art</RadiumLink>
                  <RadiumLink style={DrawerStyles.links} onClick={this.closeMenu} to='/categories'>Categories</RadiumLink>
                  <RadiumLink style={DrawerStyles.links} onClick={this.closeMenu} to='/categories/new'>Add Category</RadiumLink>
                </div>
              }
            </StyleRoot>
          </Drawer>

      </div>
    
    </MuiThemeProvider>
    )
  }
  
};




Menu.contextTypes = {
  router: React.PropTypes.object
}

Menu.propTypes = {
  user: React.PropTypes.object.isRequired,
  showAuthForm: React.PropTypes.func.isRequired,
  signOutUser: React.PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  signOutUser(router){
    dispatch(signOutUser(router));
  }
})



export default connect(null, mapDispatchToProps)(Radium(Menu));
