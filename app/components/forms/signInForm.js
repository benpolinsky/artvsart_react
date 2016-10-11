import React from 'react'
import {signUserIn} from '../../actions/userAuth.js';
import {connect} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FacebookLogin from 'react-facebook-login';
import {loginToFacebook} from '../../actions/userAuth.js';
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
    const formStyles = {
      display: `${this.props.displayForm == 'signIn' ? 'block' : 'none'}`,
      position: 'absolute',
      right: 0,
      top: 65,
      zIndex: 1201,
      background: 'white',
      padding: 50
    };
    
    return (
     <div className='registerForm' style={formStyles}>
      <form className="signUpForm">
        <h2>Sign In</h2>
        <MuiThemeProvider>
          <div>
            <TextField autoComplete={false} type='email' errorText={this.state.newUser.errors.email.join(", ")} onChange={this.update} ref='email' floatingLabelText="E-Mail" /> <br/>
            <TextField autoComplete={false} type='password' errorText={this.state.newUser.errors.password.join(", ")} onChange={this.update} ref='password' floatingLabelText="Password" /> <br/>
            <RaisedButton label="Sign In" fullWidth={true} type="submit" primary={true} onClick={this.submitForm}/>
          </div>
        </MuiThemeProvider>
      </form>
      <FacebookLogin
        appId="1118634491523505"
        autoLoad={false}
        fields="name,email,picture"
        callback={this.props.responseFacebook}
        icon="fa-facebook"
        cookie={true}
        textButton="with Facebook"
        size='small'
      />
      </div>

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
  },
  responseFacebook(response){
    dispatch(loginToFacebook(response));
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(SignInForm)