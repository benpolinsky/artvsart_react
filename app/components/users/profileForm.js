// This needs to be combined iwth signInForm, 
// they are the same except for the action they dispatch on submit
import React from 'react'
import Radium from 'radium'
import {StyleRoot} from 'radium'
import { Field, reduxForm } from 'redux-form';
import {TextField} from 'redux-form-material-ui';
import MainButton from '../elements/mainButton.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Styles from '../../styles/forms.js'
import DefaultLoader from '../defaultLoader.js'



const validate = (values) => {
  const errors = {};
  const fieldsToValidate = ['email', 'username'];
  fieldsToValidate.map((field) => {
    if (values[field] && values[field].length < 6) {
      errors[field] = "Must be 6 characters or more"
    } else if (values[field] && values[field].length >= 128) {
      errors[field] = `Woah, please keep your ${field} under 128 characters`
    }
  });
  return errors
}

export class ProfileForm extends React.Component {
  constructor(){
    super();
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(data){
    const router = this.context.router;
    this.props.formAction(data, router);      
  }
     
  render(){
    const email_errors = this.props.user.errors ? this.props.user.errors.email : '';
    const username_errors = this.props.user.errors ? this.props.user.errors.username : '';
    
    return (
      <StyleRoot>
        <DefaultLoader showing={this.props.user.fetching}>
          <form onSubmit={this.props.handleSubmit(this.submitForm)} style={Styles.centered}>
            <h2>Update Profile: </h2>
            <MuiThemeProvider>
              <div style={Styles.centered.fields}>
                <Field name="email" type="email" errorText={email_errors} floatingLabelText="E-Mail" component={TextField} /> <br/>
                <Field name="username" errorText={username_errors} floatingLabelText="Username" component={TextField} /> <br/>
                <MainButton label="Update" action={this.props.handleSubmit(this.submitForm)} />
              </div>
            </MuiThemeProvider>
          </form>
        </DefaultLoader>
      </StyleRoot>
    )
  }
}

ProfileForm.propTypes = {
  formAction: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object,
  handleSubmit: React.PropTypes.func.isRequired
}

ProfileForm.contextTypes = {
  router: React.PropTypes.object
}

ProfileForm = reduxForm({
  form: "profileForm",
  fields: ['email'],
  validate
})(ProfileForm)

export default Radium(ProfileForm)