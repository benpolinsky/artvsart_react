// this is really a 'ReduxQuickField' as it relies heavily upon it.
import React from 'react'
import formStyles from '../../styles/forms.js'
import capitalize from '../../utils/capitalize.js'
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker'
import moment from 'moment'
require('!style!css!react-datepicker/dist/react-datepicker.css');

const componentField = (props) => {
  const errors = props.meta.touched && 
                 props.meta.error && 
                (<span style={formStyles.error} className="error">{props.meta.error}</span>)
  const extraErrors = props.extraErrors && (<span style={formStyles.error} className='error'>{props.extraErrors}</span>)

  switch (props.field) {
  case 'textarea':
    return (
      <div> 
        {errors}
        {extraErrors}
        <textarea id={props.id} {...props.input} style={props.style} />
      </div>
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
    <DatePicker {...props.input} dateFormat="MM-DD-YYYY" selected={props.input.value ? moment(props.input.value, "MM-DD-YYYY") : null}/>
    )
    
  default:
    return (
      <div>
        {errors}
        {extraErrors}
        <input id={props.id} {...props.input} style={{...props.style, ...formStyles.bottomBorder}} type={props.type} />
      </div>
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

export default QuickField