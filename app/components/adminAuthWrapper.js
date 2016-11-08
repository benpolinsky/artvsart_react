import React from 'react'
import {connect} from 'react-redux'

export default function adminAuthWrapper(Component) {
  class adminAuthedComponent extends React.Component {
    
    componentWillMount(){
      const router = this.context.router;
      this.props.user.type != 'admin' && this.props.redirectNonAdmin(router);
    }
    render(){
      return(
       <div style={{height: '100%'}}> 
        {
          this.props.user.type == "admin" && <Component {...this.props} />
        }
       </div>
      )
    }
  }

  const mapDispatchToProps = (router) => (dispatch) => ({
    redirectNonAdmin(router){
      router.push('/competition')
    }
  });
  const mapStateToProps = (state) => ({
    user: state.userState.user
  });
  
  adminAuthedComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  
  adminAuthedComponent.propTypes = {
    user: React.PropTypes.object.isRequired
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(adminAuthedComponent);
}