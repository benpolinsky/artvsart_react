import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {TextField} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const textFieldStyles = {
  float: 'left',
  clear: 'both'
}

const validate = (values) => {
  const errors = {};
  const fieldsToValidate = ['name', 'creator', 'description'];

  fieldsToValidate.map((field) => {
    if (!values[field]) {
      errors[field] = "Required"
    } else if (values[field].length < 3) {
      errors[field] = "Must be 3 characters or more"
    } else if (values[field].length >= 128) {
      errors[field] = `Woah, please keep your ${field} under 128 characters`
    }
  });
  return errors
}

class ArtForm extends React.Component{
  constructor(){
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }  
  
  onSubmit(data){
    this.props.handleSubmit(this.props.submit(data));
  }
  
  render(){
    const {submit, handleSubmit, errors, art} = this.props;
    return(
     <MuiThemeProvider>
      <form onSubmit={handleSubmit(this.onSubmit)} className='createArtForm centered-form'>
        <h1 className='mainTitle'>Add New Art</h1>
        <div className='fields'>
            <Field name='name' floatingLabelText="Name" component={TextField} style={textFieldStyles} />
            <Field name='creator' floatingLabelText="Creator" component={TextField} style={textFieldStyles} />
            <Field name='description' floatingLabelText="Description" component={TextField} multiLine={true} style={textFieldStyles}  />
            <div className="uploadToS3">
              {art && art.image && <img src={art.image} />}
              {this.props.children}
            </div>
              <p>{errors}</p>
            <RaisedButton fullWidth={true} primary={true} style={textFieldStyles} type="submit" label="Create" />
        </div>

      </form>
    </MuiThemeProvider>
    )
  }
}



ArtForm = reduxForm({
  fields: ['name', "creator", 'description'],
  validate
})(ArtForm)

export default ArtForm
