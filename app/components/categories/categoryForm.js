import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { CirclePicker } from 'react-color';
import baseStyles from '../../styles/base.js';
import formStyles from '../../styles/forms.js';
import QuickField from '../forms/quickField.js';
import ArtButton from '../elements/button.js';

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


const colorComponent = ({input, meta}) => {
  const colorLabel = input.value == "" ? 'Select Color:' : `Hex: ${input.value}`;
  
  return (
    <div style={formStyles.colorPicker}>
      <h1 style={{paddingLeft: 0}}>{colorLabel}</h1>
        {meta.touched && 
        meta.error && 
        (<span style={formStyles.error} className="error">{meta.error}</span>)}
      <CirclePicker color={input.value} onChangeComplete={(value) => input.onChange(value.hex)}/>
    </div>
  )
  
}
  
const Form = ({form, formTitle, submitLabel, handleSubmit, category, categories}) => {
  return (
    <div>

        <form onSubmit={handleSubmit} style={formStyles.centered}>
          <h1 style={baseStyles.mainTitle}>{formTitle}</h1>
          <div style={formStyles.centered.fields}>
            <QuickField name="name" />
            <QuickField name='parent_category' field="select" label="Parent Category (Optional)">
              <option key={0} value="none" >None</option> 
              {categories.map((category, index) => {
                 return <option key={index+1} value={category.name}>{category.name}</option> 
              })}
            </QuickField>
            <Field label="Color" name="color" component={colorComponent} />
          </div>
          <ArtButton type='submit' label={submitLabel} />
        </form>

    </div>
  )
}

const CategoryForm = reduxForm({
  fields: ['name', 'color', 'parent_category'],
  validate
})(Form);

export default CategoryForm