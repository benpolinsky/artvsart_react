import React from 'react';
import {connect} from 'react-redux';
import Radium, {StyleRoot} from 'radium';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {TextField} from 'redux-form-material-ui';
import MainButton from '../elements/mainButton.js';
import { Field, reduxForm } from 'redux-form';
import Styles from '../../styles/forms.js'
import BaseStyles from '../../styles/base.js' 
import {restoreUser} from '../../actions/userAuth.js';
import FacebookButton from '../elements/facebookButton.js';

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

class RestoreUser extends React.Component{
  constructor(){
    super();
    this.submitForm = this.submitForm.bind(this);
  }
  
  submitForm(data){
    const router = this.context.router;
    this.props.submitRestoreUserForm(data, router);      

  }
      
  render(){
    const email_errors = this.props.errors ? this.props.errors.email : ''
    
    return(
      <StyleRoot>
        <div>
          <form form='restoreUser' style={Styles.centered} onSubmit={this.props.handleSubmit(this.submitForm)}>
            <h2>Restore Account</h2>
            <MuiThemeProvider>
             
                {
                  this.props.user.facebookRestoring 
                    ? 
                  <FacebookButton restoring label="Restore With Facebook" />
                    :
                   <div>
                    <Field name="email" errorText={email_errors} floatingLabelText="E-Mail" component={TextField} /> <br/>
                    <Field name="password" type='password' floatingLabelText="Password" component={TextField} /> <br/>
                    <MainButton label="Restore!" action={this.props.handleSubmit(this.submitForm)} />;
                  </div>
                }
       
            </MuiThemeProvider>
          </form>
        </div>
      </StyleRoot>
    )
  }
}

RestoreUser.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (state) => ({
  user: state.userState.user
});

const mapDispatchToProps = (dispatch) => ({
  submitRestoreUserForm(data, router){

    console.log(data, router)
    dispatch(restoreUser(data, router))
  }
})

RestoreUser = reduxForm({
  form: 'restoreUser',
  fields: ['email', 'password'],
  validate
})(RestoreUser)

export default connect(mapStateToProps, mapDispatchToProps)(Radium(RestoreUser))