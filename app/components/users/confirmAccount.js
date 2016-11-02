import React from 'react'
import {connect} from 'react-redux'
import {confirmUserAccount} from '../../actions/userAuth.js'

class confirmAccount extends React.Component{
  componentDidMount(){
    this.props.confirmUser(this.props.params.token, this.context.router)
  }
  
  render(){
    return (<p>One sec...</p>)  
  }
}

confirmAccount.contextTypes = {
  router: React.PropTypes.object
}
  
  
const mapDispatchToProps = (dispatch, router) => ({
  confirmUser(token, router){
    dispatch(confirmUserAccount(token, router));
  }
})

export default connect(null, mapDispatchToProps)(confirmAccount)