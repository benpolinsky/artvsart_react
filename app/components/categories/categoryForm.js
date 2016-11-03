import React from 'react'
import { Field, reduxForm } from 'redux-form';
import {TextField} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';
import {SelectField} from 'redux-form-material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { CirclePicker } from 'react-color';
import baseStyles from '../../styles/base.js';
import formStyles from '../../styles/forms.js';

const textFieldStyles = {
  float: 'left',
  clear: 'both'
}

const validate = (values) => {
  const errors = {};
  const fieldsToValidate = ['name', 'color'];

  fieldsToValidate.map((field) => {
    if (!values[field]) {
      errors[field] = "Required"
    } 
  });
  return errors
}
const renderField = ({input}) => {
  const colorLabel = input.value == "" ? 'Select Color:' : `Hex: ${input.value}`;
  
  return (
    <div>
      <Subheader style={{paddingLeft: 0}}>{colorLabel}</Subheader>
      <CirclePicker color={input.value} onChangeComplete={(value) => input.onChange(value.hex)}/>
    </div>
  
  )
  
}
  
const Form = ({form, formTitle, submitLabel, handleSubmit, category, categories}) => {
  return (
    <div>
      <MuiThemeProvider>
        <form onSubmit={handleSubmit} style={formStyles.centered}>
          <h1 style={baseStyles.mainTitle}>{formTitle}</h1>
          <div style={formStyles.centered.fields}>
            <Field floatingLabelText="Name" name="name" component={TextField}/><br/>
            <Field name='parent_category' floatingLabelText="Parent Category (Optional)" component={SelectField} style={textFieldStyles}>
              {categories.map((category, index) => {
                 return <MenuItem key={index} value={category.name} primaryText={category.name} />
              })}
            </Field>
            <Field label="Color" name="color" component={renderField} /><br/>
          </div>
          <RaisedButton type='submit' primary label={submitLabel} />
        </form>
      </MuiThemeProvider>
    </div>
  )
}

const CategoryForm = reduxForm({
  fields: ['name', 'color', 'parent_category'],
  validate
})(Form);

export default CategoryForm