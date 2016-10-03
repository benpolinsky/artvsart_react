import React from 'react'
import ReactDOM from 'react-dom'
import {signUserIn} from '../../actions/userAuth.js';
import {connect} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

export class SignInForm extends React.Component {
  constructor(){
    super();
    this.update = this.update.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  
  componentDidMount(){
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
    const router = this.context.router;
    const newUser = this.state.newUser;
    if (newUser.email.length > 6 && newUser.password.length > 3) {
      this.props.registerUser(this.state.newUser, router);      
    }
  }
  
  
  render(){
    return (
      <form className='signUpForm form col-xs-12'>
        <h2>Sign In</h2>
        <div className='form-group'>
          <label name='email'>Email Address</label>
          <div className='errors'>{this.props.errors}</div>
          <input className='form-control' type='email' onKeyUp={this.update} ref='email' />
        </div>
        <div className='form-group'>
          <label name='password'>Password</label>
          <input className='form-control' type='password' onKeyUp={this.update} ref='password' />
        </div>
        <div className='form-group'>
          <MuiThemeProvider>
            <RaisedButton label="submit" type="submit" primary={true} onClick={this.submitForm}/>
          </MuiThemeProvider>
        </div>
      </form>

    )
  }
}

SignInForm.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (store) => ({
  errors: store.userState.errors
})

const mapDispatchToProps = (dispatch) => ({
  registerUser(user, router){
    dispatch(signUserIn(user, router));
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(SignInForm)