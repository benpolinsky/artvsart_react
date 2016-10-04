// thanks to: https://github.com/joshgeller/react-redux-jwt-auth-example for the idea.
//  I should render a loader while authenticating.

import React from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from './actions/userAuth.js';

export default function requireAuthentication(Component){
  class AuthenticatedComponent extends React.Component{
    componentWillMount(){
      if (!this.props.user.authenticated) {
        this.initializeAuth();
      }
    }
  
    initializeAuth(){
      this.props.initializeApp();
    }
    
    render(){
      return(
       <div> 
        {this.props.user.authenticated && <Component {...this.props} />}
       </div>
      )
    }
  }
  
  const mapDispatchToProps = (dispatch) => ({
    initializeApp(){
      dispatch(getUserInfo());
    } 
  });
  
  const mapStateToProps = (state) => ({
    user: state.userState.user
  });
  
  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}

