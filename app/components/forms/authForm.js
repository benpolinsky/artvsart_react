// This needs to be combined iwth signInForm, 
// they are the same except for the action they dispatch on submit
import React from 'react'
import { Field, reduxForm } from 'redux-form';
import {TextField} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FacebookLogin from 'react-facebook-login';
import Radium from 'radium'


const validate = (values) => {
  const errors = {};
  const fieldsToValidate = ['email', 'password'];
  fieldsToValidate.map((field) => {
    if (!values[field]) {
      errors[field] = "Required"
    } else if (values[field].length < 6) {
      errors[field] = "Must be 6 characters or more"
    } else if (values[field].length >= 128) {
      errors[field] = `Woah, please keep your ${field} under 128 characters`
    }
  });
  return errors
}

export class AuthForm extends React.Component {
  constructor(){
    super();
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(data){
    const router = this.context.router;
    this.props.formAction(data, router);      
  }
  
  render(){
    const formStyles = {
      display: `${this.props.displayForm == this.props.formType ? 'block' : 'none'}`,
      position: 'absolute',
      right: 0,
      top: 65,
      zIndex: 1201,
      background: 'white',
      padding:50
    };
    
    // Having trouble getting redux-form's server validation to work
    // Thus, I'm handling server errors through actions/state
    
    const email_errors = this.props.errors ? this.props.errors.email : ''
    
    return (
      <div className='registerForm' style={formStyles}>
        <form form={`${this.props.formType}Form`} onSubmit={this.props.handleSubmit(this.submitForm)} className="signUpForm">
          <h2>{this.props.formTitle}</h2>
          <MuiThemeProvider>
            <div>
              <Field name="email" errorText={email_errors} floatingLabelText="E-Mail" component={TextField} /> <br/>
              <Field name="password" type='password' floatingLabelText="Password" component={TextField} /> <br/>
              <RaisedButton label={this.props.formTitle} fullWidth type="submit" primary />
            </div>
          </MuiThemeProvider>
        </form>
      
        <FacebookLogin
          appId="1118634491523505"
          autoLoad={false}
          fields="name,email,picture"
          callback={this.props.responseFacebook}
          icon="fa-facebook"
          cookie
          textButton="with Facebook"
          size='small'
        />
      </div>
    )
  }
}

AuthForm.propTypes = {
  formAction:React.PropTypes.func.isRequired,
  displayForm: React.PropTypes.string.isRequired,
  formType: React.PropTypes.string.isRequired,
  errors: React.PropTypes.object,
  handleSubmit: React.PropTypes.func.isRequired,
  formTitle: React.PropTypes.string.isRequired,
  responseFacebook: React.PropTypes.func.isRequired
}

AuthForm.contextTypes = {
  router: React.PropTypes.object
}

AuthForm = reduxForm({
  fields: ['email', 'password'],
  validate
})(AuthForm)

export default Radium(AuthForm)