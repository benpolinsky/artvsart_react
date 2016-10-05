// This needs to be combined iwth signInForm, 
// they are the same except for the action they dispatch on submit
import React from 'react'
import {registerUser} from '../../actions/userAuth.js';
import {connect} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export class SignUpForm extends React.Component {
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
        email:this.refs.email.getValue(),
        password: this.refs.password.getValue()
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
      <form className='signUpForm form'>
        <h2>Register</h2>
        <MuiThemeProvider>
          <div>
            <TextField type='email' onChange={this.update} ref='email' floatingLabelText="E-Mail" /> <br/>
            <TextField type='password' onChange={this.update} ref='password' floatingLabelText="Password" /> <br/>
            <RaisedButton label="submit" type="submit" primary={true} onClick={this.submitForm}/>
          </div>
        </MuiThemeProvider>
      </form>
     

    )
  }
}

SignUpForm.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (store) => ({
  errors: store.userState.errors
})

const mapDispatchToProps = (dispatch) => ({
  registerUser(user, router){
    dispatch(registerUser(user, router));
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)