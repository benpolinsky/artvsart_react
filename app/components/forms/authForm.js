// This needs to be combined iwth signInForm, 
// they are the same except for the action they dispatch on submit
import React from 'react'
import {Link} from 'react-router'
import Radium from 'radium'
import {StyleRoot} from 'radium'
import { Field, reduxForm } from 'redux-form';
import {TextField} from 'redux-form-material-ui';
import MainButton from '../elements/mainButton.js';
import FacebookButton from '../elements/facebookButton.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Styles from '../../styles/forms.js'
import BaseStyles from '../../styles/base.js' 



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
      display: `${this.props.displayForm == this.props.formType ? 'block' : 'none'}`
    };
    
    // Having trouble getting redux-form's server validation to work
    // Thus, I'm handling server errors through actions/state
    
    const email_errors = this.props.errors ? this.props.errors.email : ''
    return (
       <StyleRoot>
      <div className='registerForm' style={[Styles.authForm, formStyles]}>
        <form form={`${this.props.formType}Form`} onSubmit={this.props.handleSubmit(this.submitForm)} className="signUpForm">
          <h2>{this.props.formTitle}</h2>
          <MuiThemeProvider>
            <div>
              <Field name="email" errorText={email_errors} floatingLabelText="E-Mail" component={TextField} /> <br/>
              <Field name="password" type='password' floatingLabelText="Password" component={TextField} /> <br/>
              <MainButton label={this.props.formTitle} action={this.props.handleSubmit(this.submitForm)} />
            </div>
          </MuiThemeProvider>
        </form>
      
        <FacebookButton label={`${this.props.formTitle} With Facebook`}/>
        <Link style={BaseStyles.traditionalLink} onTouchTap={() => this.props.showAuthForm('forgotPassword')}>Forgot Password?</Link>
      </div>
      </StyleRoot>
    )
  }
}

AuthForm.propTypes = {
  formAction:React.PropTypes.func.isRequired,
  displayForm: React.PropTypes.string.isRequired,
  formType: React.PropTypes.string.isRequired,
  errors: React.PropTypes.array,
  handleSubmit: React.PropTypes.func.isRequired,
  formTitle: React.PropTypes.string.isRequired
}

AuthForm.contextTypes = {
  router: React.PropTypes.object
}

AuthForm = reduxForm({
  fields: ['email', 'password'],
  validate
})(AuthForm)

export default Radium(AuthForm)