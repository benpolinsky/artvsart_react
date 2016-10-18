import React from 'react';
import {Link} from 'react-router';
import {Router} from 'react-router';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import {signOutUser} from '../actions/userAuth.js'
import AuthNav from './authNav.js'

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
    const totals = this.props.totals;
    const user_type = this.props.user.type;
    const user_email = this.props.user.email
    return (
    <MuiThemeProvider>
      <div>
        <AppBar 
          className="appBar" 
          title="ART V ART"
          onLeftIconButtonTouchTap={this.openMenu}
          iconStyleRight={{marginTop: 0}}
          iconElementRight={
            user_type == "GuestUser" ?
            
            <AuthNav showAuthForm={this.props.showAuthForm}/>
            : 
            
            <MuiThemeProvider>
              <DropDownMenu className="userMenu" onChange={this.selectMenuItem} value={this.state.menu} labelStyle={{color: 'black', borderBottom: 0, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis'}} >
                <MenuItem value='email' primaryText={`${user_email}`} />
                <MenuItem value='profile' primaryText="Your Profile" />
                <MenuItem value='sign_out' primaryText="Sign Out" />

              </DropDownMenu>
            </MuiThemeProvider>
          }
        />
        <Drawer className="navDrawer" docked={false} open={this.state.navMenuOpen} onRequestChange={(open) => this.setState({navMenuOpen: open})}>
          <h1>ART V ART</h1>
          <Link onTouchTap={this.closeMenu} to="/competition">Competition</Link>
          <Link onTouchTap={this.closeMenu} to="/about">About</Link>
          <Link onTouchTap={this.closeMenu} to="/leaderboard">Leaderboard</Link>
          <Link onTouchTap={this.closeMenu} to="/user_rankings">User Rankings</Link>
          <Link onTouchTap={this.closeMenu} to="/top_judges">Top Judges</Link>
           {user_type == "admin" &&
              <div className='adminLinks'>
                <Link onTouchTap={this.closeMenu} to="/art/new"> Add Art</Link>
                <Link onTouchTap={this.closeMenu} to='/import_art'>Import Art</Link>
                <Link onTouchTap={this.closeMenu} to='/categories'>Categories</Link>
                <Link onTouchTap={this.closeMenu} to='/categories/new'>Add Category</Link>
              </div>
            }
        </Drawer>
      </div>
    
    </MuiThemeProvider>
    )
  }
  
};




Menu.contextTypes = {
  router: React.PropTypes.object
}

const mapDispatchToProps = (dispatch) => ({
  signOutUser(router){
    dispatch(signOutUser(router));
  }
})



export default connect(null, mapDispatchToProps)(Menu);

// <nav className="mainMenu">
//
//   <ul>
//     <Link to="/">AVA</Link>
//
//     <li></li>

//
//     {user_type == "GuestUser" &&
//      <ul className='nav navbar-nav'>
//       <li className="nav-item">
//         <Link className="nav-link" to="/sign_up">Register</Link>
//       </li>
//       <li className="nav-item">
//         <Link className="nav-link" to="/sign_in">Sign In</Link>
//       </li>
//      </ul>}
//
//     
//
//     {user_type == null &&
//       }
//
//
//   </ul>
//
//   <ul className="pull-right nav navbar-nav">
//     <li className="navbar-brand">{totals.total_art} Arts </li>
//     <li className="navbar-brand">{totals.total_art_judged} Arts Judged </li>
//     <li className="navbar-brand">{totals.finished_competitions} Battles</li>
//   </ul>
//
//
// </nav>