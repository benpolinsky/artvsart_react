// This needs to be combined iwth signInForm, 
// they are the same except for the action they dispatch on submit
import React from 'react'
import { Link } from 'react-router'
import Radium from 'radium'
import { StyleRoot } from 'radium'
import { Field, reduxForm } from 'redux-form';
import QuickField from './quickField.js'
import FormHeader from './formHeader.js'
import ArtButton from '../elements/button.js';
import FacebookButton from '../elements/facebookButton.js';
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
  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidUpdate(prevProps) {
    const currentFormIsDisplayed = this.props.displayForm == this.props.formType;
    const currentFormWasDisplayed = prevProps.displayForm == this.props.formType;
    if (prevProps == this.props) {
      return false
    } else if (currentFormIsDisplayed && !currentFormWasDisplayed) {
      this.props.clearForm()
    }
  }

  submitForm(data) {
    const router = this.context.router;
    this.props.formAction(data, router);
  }

  render() {

    const formStyles = {
      display: `${this.props.displayForm == this.props.formType ? 'block' : 'none'}`
    };

    // Having trouble getting redux-form's server validation to work
    // Thus, I'm handling server errors through actions/state

    const email_errors = this.props.errors ? this.props.errors : '';
    return (
      <StyleRoot>
        <div className='registerForm' style={[Styles.authForm, formStyles]}>
          <form form={`${this.props.formType}Form`} onSubmit={this.props.handleSubmit(this.submitForm)} className="signUpForm">
            <FormHeader label={this.props.formTitle} />
            <div style={Styles.centered.fields}>
              <QuickField name="email" type='email' extraErrors={email_errors} label="E-Mail" />
              <QuickField name="password" type='password' />
              <ArtButton label={this.props.formTitle} kind="responsive" action={this.props.handleSubmit(this.submitForm)} />
            </div>
          </form>

          <FacebookButton label={`${this.props.formTitle} With Facebook`} />
          <Link style={BaseStyles.traditionalLink} onClick={() => this.props.showAuthForm('forgotPassword')}>Forgot Password?</Link>
        </div>
      </StyleRoot>
    )
  }
}

AuthForm.propTypes = {
  formAction: React.PropTypes.func.isRequired,
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