// This needs to be combined iwth signInForm, 
// they are the same except for the action they dispatch on submit
import React from 'react'
import Radium from 'radium'
import {connect} from 'react-redux'
import {StyleRoot} from 'radium';
import { Field, reduxForm } from 'redux-form';
import {TextField} from 'redux-form-material-ui';
import MainButton from '../elements/button.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Styles from '../../styles/forms.js';
import {submitNewPassword} from '../../actions/userAuth.js';




const validate = (values) => {
  const errors = {};
  const fieldsToValidate = ['password', 'password_confirmation'];
  fieldsToValidate.map((field) => {
    if (!values[field]) {
      errors[field] = "Required"
    } else if (values[field].length < 6) {
      errors[field] = "Must be 6 characters or more"
    } else if (values[field].length >= 128) {
      errors[field] = `Woah, please keep your ${field} under 128 characters`
    }
  });
  if (values['password'] !== values['password_confirmation']) {
    errors['password_confirmation'] = "Password and Confirmation Must Match!"
  }
  return errors
}

export class NewPasswordForm extends React.Component {
  constructor(){
    super();
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(data){
    const router = this.context.router;
    this.props.formAction({...data, reset_password_token: this.props.params.token}, router);      
  }
     
  render(){

    const password_errors = this.props.user.errors ? this.props.user.errors.password : '';
    const password_confirmation_errors = this.props.user.errors ? this.props.user.errors.password_confirmation : ''
    const token_error = this.props.user.errors ? this.props.user.errors.reset_password_token : ''

    return (
      <StyleRoot>
        <div>
          <form style={Styles.centered} onSubmit={this.props.handleSubmit(this.submitForm)}>
            <h2>Change Password</h2>
            <MuiThemeProvider>
              <div style={Styles.centered.fields}>
                {token_error && <p style={Styles.formError}>Sorry, this password token {token_error[0]}</p>}
                <Field 
                  name="password" 
                  type="password" 
                  errorText={password_errors} 
                  floatingLabelText="New Password" 
                  component={TextField} 
                />     
                <br/>
                <Field 
                  name="password_confirmation" 
                  type="password" 
                  errorText={password_confirmation_errors} 
                  floatingLabelText="New Password Confirmation"
                  component={TextField} 
                />     
                <br/>
                  
                <MainButton label="Update" action={this.props.handleSubmit(this.submitForm)} />
              </div>
            </MuiThemeProvider>
          </form>
        </div>
      </StyleRoot>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userState.user
})

const mapDispatchToProps = (dispatch) => ({
  formAction(data, router){
    dispatch(submitNewPassword(data, router));
  }
});

NewPasswordForm.propTypes = {
  formAction: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object,
  handleSubmit: React.PropTypes.func.isRequired
}

NewPasswordForm.contextTypes = {
  router: React.PropTypes.object
}

NewPasswordForm = reduxForm({
  form: "passwordForm",
  fields: ['password', 'password_confirmation'],
  validate
})(NewPasswordForm)

export default connect(mapStateToProps, mapDispatchToProps)(Radium(NewPasswordForm))