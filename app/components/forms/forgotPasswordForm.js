import React from 'react';
import {Link} from 'react-router';
import Radium from 'radium';
import {StyleRoot} from 'radium';
import { Field, reduxForm } from 'redux-form';
import Styles from '../../styles/forms.js';
import BaseStyles from '../../styles/base.js';
import ArtButton from '../elements/button.js';
import QuickField from './quickField.js';
import InlineSeparator from '../elements/inlineSeparator.js';
import FormHeader from './formHeader.js';

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
          <FormHeader label='Reset Password' />

            <div>
              <QuickField type="email" name="email" label="E-Mail" /> 
              <ArtButton styles={{width: '100%'}} kind='responsive' label="Reset Password" action={this.props.handleSubmit(this.submitForm)} />
              <Link style={BaseStyles.traditionalLink} onClick={() => this.props.showAuthForm('signIn')}>Sign In</Link> 
              <InlineSeparator />
              <Link style={BaseStyles.traditionalLink} onClick={() => this.props.showAuthForm('register')}>Register</Link>
            </div>

        </form>
      </div>
</StyleRoot>
    )
  }
}

ForgotPasswordForm = reduxForm({
  fields: ['email'],
  onSubmitFail: (errors, dispatch) => console.log(errors, dispatch),
  validate
})(ForgotPasswordForm)

export default Radium(ForgotPasswordForm)