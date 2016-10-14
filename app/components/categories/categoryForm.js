import React from 'react'
import { Field, reduxForm } from 'redux-form';
import {TextField} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { CirclePicker } from 'react-color';

const validate = () => {
}

const renderField = ({input}) => (
  <CirclePicker color={input.value} onChangeComplete={(value) => input.onChange(value.hex)}/>
)
  
const Form = ({form, formTitle, formType, submitLabel, handleSubmit}) => {
  return (
    <div>
      <MuiThemeProvider>
        <form onSubmit={handleSubmit} className='centered-form'>
          <h1 className='mainTitle'>{formTitle}</h1>
          <div className='fields'>
            <Field floatingLabelText="Name" name="name" component={TextField}/><br/>
            <Field floatingLabelText="Color" name="color" component={renderField} /><br/>
          </div>
          <RaisedButton type='submit' primary={true} label={submitLabel} />
        </form>
      </MuiThemeProvider>
    </div>
  )
}

const CategoryForm = reduxForm({
  fields: ['name', 'color']

})(Form);

export default CategoryForm