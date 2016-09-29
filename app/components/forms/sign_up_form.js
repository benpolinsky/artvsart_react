import React from 'react'
import ReactDOM from 'react-dom'
import * as api from '../../utils/ajax_helpers.js'
import {registerUser} from '../../actions/index.js'
import {connect} from 'react-redux'


export default class SignUpForm extends React.Component {
  constructor(){
    super();
    this.update = this.update.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  
  componentWillMount(){
    this.setState({
      newUser: {
        email: 'your@email',
        password: ''
      }
    })
  }
  
  update(e){
    this.setState({
      newUser: {
        email: ReactDOM.findDOMNode(this.refs.email).value,
        password: ReactDOM.findDOMNode(this.refs.password).value
      }
    })
  }
  
  submitForm(e){
    e.preventDefault();
    this.props.registerUser(this.state.newUser);
  }
  
  
  render(){
    return (
      <form onSubmit={this.submitForm} className='signUpForm form col-xs-12'>
        <div className='form-group'>
          <label name='email'>Email Address</label>
          <input className='form-control' type='email' onKeyUp={this.update} ref='email' />
        </div>
        <div className='form-group'>
          <label name='password'>Password</label>
          <input className='form-control' type='password' onKeyUp={this.update} ref='password' />
        </div>
        <div className='form-group'>
          <input className='form-control btn btn-primary02' type='submit' defaultValue='Sign Up' />
        </div>
      </form>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  registerUser(user){
    dispatch(registerUser(user))
  }
})


export default connect(null, mapDispatchToProps)(SignUpForm)