import React from 'react';
import {connect} from 'react-redux';
import dropStyles from '../../styles/userDropDown.js'
import UserGravatar from './userGravatar.js';
import Radium from 'radium';
import {StyleRoot} from 'radium';
import {Link} from 'react-router';

import {signOutUser} from '../../actions/userAuth.js';

class UserDropDown extends React.Component {
  
  handleMenuClick(itemName){
    if (itemName == 'profile') {
      this.context.router.push('profile');
    } else if (itemName = "signOut"){
      this.props.signOutUser(this.context.router)
    }
    this.props.closeMenu();
  }
  
  render(){
    return (
      <div style={dropStyles.container}>
        <div style={dropStyles.triangle}></div>
        <header style={dropStyles.header}>
          <div style={dropStyles.userInfoContainer}>
            <p style={{fontSize: 12}}>
             { 
              this.props.user.username ?
               `@${this.props.user.username}` : 
              'No username yet!'
             }
             </p>
            <p style={{fontSize: 14}}>{this.props.user.email}</p>

          </div>
        </header>
        <StyleRoot>
          <ul style={dropStyles.list}>
            <li key='0' onClick={this.handleMenuClick.bind(this, "profile")} style={dropStyles.listItem}>Profile</li>
            <li key='1' onClick={this.handleMenuClick.bind(this, "signOut")} style={dropStyles.listItem}>Sign Out</li>
          </ul>
        </StyleRoot>
      </div>
    )
  }
}

UserDropDown.contextTypes = {
  router: React.PropTypes.object
}

const mapDispatchToProps = (dispatch) => ({
  signOutUser(router){
    dispatch(signOutUser(router));
  }
})



export default connect(null, mapDispatchToProps)(Radium(UserDropDown))