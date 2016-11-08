import React from 'react';
import {Link} from 'react-router';
import Radium from 'radium';
import {StyleRoot} from 'radium';
import { Field, reduxForm } from 'redux-form';
import Styles from '../../styles/forms.js';
import BaseStyles from '../../styles/base.js';
import {TextField} from 'redux-form-material-ui';
import MainButton from '../elements/mainButton.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const validate = (values) => {
  const errors = {};
  const fieldsToValidate = ['email'];
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


class ForgotPasswordForm extends React.Component{
  constructor(){
    super();
    this.submitForm = this.submitForm.bind(this);
  }
  
  submitForm(data){
    this.props.formAction(data);      
  }
  
  render(){
    const formStyles = {
      display: `${this.props.displayForm == 'forgotPassword' ? 'block' : 'none'}`
    };
    
    return (
    <StyleRoot>
      <div style={[Styles.authForm, formStyles]}>
        <form form="forgotPassword" onSubmit={this.props.handleSubmit(this.submitForm)} className="signUpForm">
          <h2>Reset Password</h2>
          <MuiThemeProvider>
            <div>
              <Field name="email" floatingLabelText="E-Mail" component={TextField} /> <br/>
              <MainButton label="Reset Password" action={this.props.handleSubmit(this.submitForm)} />
              <Link style={BaseStyles.traditionalLink} onTouchTap={() => this.props.showAuthForm('signIn')}>Sign In</Link> 
              <span style={BaseStyles.inlineSeparator}>|</span>
              <Link style={BaseStyles.traditionalLink} onTouchTap={() => this.props.showAuthForm('register')}>Register</Link>
            </div>
          </MuiThemeProvider>
        </form>
      </div>
</StyleRoot>
    )
  }
}

ForgotPasswordForm = reduxForm({
  fields: ['email'],
  onSubmitFail: (errors, dispatch) => console.log(errors, dispatch)
})(ForgotPasswordForm)

export default Radium(ForgotPasswordForm)