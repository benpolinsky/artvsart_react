import React from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from '../actions/userAuth.js';

export default function requireAuthentication(Component){
  class AuthenticatedComponent extends React.Component{
    render(){
      return(
       <div style={{height: '100%'}}> 
        {
          this.props.user.authenticated && <Component {...this.props} />
        }
       </div>
      )
    }
  }

  
  const mapStateToProps = (state) => ({
    user: state.userState.user
  });
  
  AuthenticatedComponent.propTypes = {
    user: React.PropTypes.object.isRequired
  }
  

  
  return connect(mapStateToProps)(AuthenticatedComponent);
}

