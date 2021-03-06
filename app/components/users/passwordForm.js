// This needs to be combined iwth signInForm, 
// they are the same except for the action they dispatch on submit
import React from 'react'
import Radium from 'radium'
import {StyleRoot} from 'radium'
import { Field, reduxForm } from 'redux-form';
import QuickField from '../forms/quickField.js';
import ArtButton from '../elements/button.js';
import Styles from '../../styles/forms.js'

const validate = (values) => {
  const errors = {};
  const fieldsToValidate = ['current_password', 'password', 'password_confirmation'];
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

export class PasswordForm extends React.Component {
  constructor(){
    super();
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(data){
    this.props.formAction(data);      
  }
     
  render(){
    const current_password_errors = this.props.user.errors ? this.props.user.errors.current_password : ''
    const password_errors = this.props.user.errors ? this.props.user.errors.password : ''
    const password_confirmation_errors = this.props.user.errors ? this.props.user.errors.password_confirmation : ''
    
    return (
      <StyleRoot>
        <div>
          <form style={Styles.centered} onSubmit={this.props.handleSubmit(this.submitForm)}>
            <h2>Change Password</h2>
              <br/>
              <div>

                <QuickField 
                  name="current_password" 
                  type="password" 
                  extraErrors={current_password_errors} 
                  label="Current Password" 
                /> 

                <QuickField 
                  name="password" 
                  type="password" 
                  extraErrors={current_password_errors} 
                  label="New Password" 
                />   
                    
                <QuickField 
                  name="password_confirmation" 
                  type="password" 
                  extraErrors={current_password_errors} 
                  label="New Password Confirmation"
                />     

                  
                <ArtButton label="Update" action={this.props.handleSubmit(this.submitForm)} />
              </div>

          </form>
        </div>
      </StyleRoot>
    )
  }
}

PasswordForm.propTypes = {
  formAction: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object,
  handleSubmit: React.PropTypes.func.isRequired
}

PasswordForm.contextTypes = {
  router: React.PropTypes.object
}

PasswordForm = reduxForm({
  form: "passwordForm",
  fields: ['current_password', 'password', 'password_confirmation'],
  validate
})(PasswordForm)
export default Radium(PasswordForm)