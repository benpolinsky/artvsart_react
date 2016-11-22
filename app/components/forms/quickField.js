// this is really a 'ReduxQuickField' as it relies heavily upon it.
import React from 'react'
import Radium, {StyleRoot} from 'radium';
import formStyles from '../../styles/forms.js'
import capitalize from '../../utils/capitalize.js'
import { Field, reduxForm } from 'redux-form';
require('!style!css!react-datepicker/dist/react-datepicker.css');

const componentField = (props) => {
  const errors = props.meta.touched && 
                 props.meta.error && 
                (<span style={formStyles.error} className="error">{props.meta.error}</span>)
  const extraErrors = props.extraErrors && (<span style={formStyles.error} className='error'>{props.extraErrors}</span>)

  switch (props.field) {
  case 'textarea':
    return (
      <StyleRoot> 
        {errors}
        {extraErrors}
        <textarea 
          id={props.id} 
          {...props.input} 
          style={{...props.style, 
                  ...formStyles.bottomBorder, 
                  ...formStyles.textarea}} 
        />
      </StyleRoot>
    )
  case 'select':
    return (
      <div>
        {errors}
        {extraErrors}
        <select id={props.id} {...props.input}  style={props.style}>{props.children}</select>
      </div>
    )
  case 'date':    

    return (
      
      <StyleRoot>
        {errors}
        {extraErrors}
        <input 
        type='text' 
        id={props.id} 
        {...props.input} 
        value={props.input.value} style={{...props.style, ...formStyles.bottomBorder}} />
      </StyleRoot>

    )
    
  default:
    return (
      <StyleRoot>
        {errors}
        {extraErrors}
        <input id={props.id} {...props.input} style={{...props.style, ...formStyles.bottomBorder}} type={props.type} />
      </StyleRoot>
    )
  }
}

const QuickField = ({name, field='input', type='text', label, styles={}, children, extraErrors}) => {
  const labelText = label ? label : capitalize(name);
   
  return(
    
      <div style={formStyles.fieldContainer}>
        <label htmlFor={name} style={formStyles.label}>{labelText}:</label>
        <Field 
           field={field}
           type={type} 
           style={{...formStyles.basicField, ...styles}}
           id={name} 
           name={name} 
           component={componentField}
           children={children}
           extraErrors={extraErrors}
          />
      </div>

  )
}

export default Radium(QuickField)