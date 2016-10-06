import React from 'react'
import {signUserIn} from '../../actions/userAuth.js';
import {connect} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export class SignInForm extends React.Component {
  constructor(){
    super();
    this.update = this.update.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  componentWillMount(){
    this.setState({
      newUser: {
        email: 'your@email',
        password: '',
        errors: {
          email: [],
          password: []
        }
      }
    })
  }
  
  componentDidMount(){
    this.setState({
      newUser: {
        email: 'your@email',
        password: '',
        errors: {
          email: [],
          password: []
        }
      }
    })
  }
  
  validateForm(){
    
    let errors = {
      email: [],
      password: []
    }
    
    if (this.state.newUser.email.length < 2) {
      errors = {
        ...errors,
        email: ['please enter a minimum of 2 letters']
      }
    } 
    if (this.state.newUser.password.length < 2) {
      errors = {
        ...errors,
        password: ['please enter a minimum of 2 letters']
      }
    }
    
    
    this.setState({
      ...this.state,
      newUser: {
        ...this.state.newUser,
        errors: errors
      }
    })
    const errorCount = Object.values(errors);
    return !errorCount.some((error) => { return error.length > 0})
  }
  
  update(e){
    this.setState({
      newUser: {
        ...this.state.newUser,
        email: this.refs.email.getValue(),
        password: this.refs.password.getValue()
      }
    })
  }
  
  submitForm(e){
    e.preventDefault();
    const router = this.context.router;
    const newUser = this.state.newUser;
    if (this.validateForm()) {
      this.props.registerUser(this.state.newUser, router);      
    }
  }
  
  
  render(){
    return (
      <form className='signUpForm form'>
        <h2>Sign In</h2>
        <MuiThemeProvider>
          <div>
            <TextField type='email' errorText={this.state.newUser.errors.email.join(", ")} onChange={this.update} ref='email' floatingLabelText="E-Mail" /> <br/>
            <TextField type='password' errorText={this.state.newUser.errors.password.join(", ")} onChange={this.update} ref='password' floatingLabelText="Password" /> <br/>
            <RaisedButton label="submit" type="submit" primary={true} onClick={this.submitForm}/>
          </div>
        </MuiThemeProvider>
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