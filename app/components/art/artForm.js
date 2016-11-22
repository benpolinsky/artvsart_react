import React from 'react';
import Radium from 'radium';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import Datejs from 'datejs'
import baseStyles from '../../styles/base.js'
import formStyles from '../../styles/forms.js'
import QuickField from '../forms/quickField.js'
import ArtButton from '../elements/button.js'

const textFieldStyles = {
  float: 'left',
  clear: 'both',
  width: '100%'
}


const validate = (values) => {
  const errors = {};
  const fieldsToValidate = ['name', 'creator', 'description'];

  fieldsToValidate.map((field) => {
    if (!values[field]) {
      errors[field] = "Required"
    } else if (values[field].length < 3) {
      errors[field] = "Must be 3 characters or more"
    } else if (field != 'description' && values[field].length >= 128) {
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
    const {submit, handleSubmit, errors, art, formTitle, submitLabel, categories} = this.props;
    const currentImage = (art && art.image && <div><p>Current Image: </p> <br/> <img style={{maxWidth: '300px'}} src={art.image} /></div>)
    
    return(

      <form onSubmit={handleSubmit(this.onSubmit)} style={formStyles.centered}>
        <h1 style={baseStyles.mainTitle}>{formTitle}</h1>

        <div style={formStyles.centered.fields}>
          <QuickField name="name" />
          
          <QuickField name="creator" />
          
          <QuickField name="description" field='textarea' />
          
          <QuickField name="creation_date" label="Creation Date" field='date' />
          
          <QuickField name="category_name" label="Category" field='select'>
            <option disabled>Select Category: </option>
            {categories.map((category) => {
              return <option key={category.id} value={category.name}>{category.name}</option>
            })}
          </QuickField>
            
          <QuickField name="source" field='select'>
            <option disabled>Select Source: </option>
            <option value="Discogs">Discogs</option>
            <option value="IMDB">IMDB</option>
            <option value="Artsy">Artsy</option>
            <option value="Harvard Art Museums"> Harvard Art Museums </option>
            <option value="Philadelphia Public Art">Philadelphia Public Art</option>
            <option value="Google Books">Google Books</option>
            <option value="other">Other</option>
          </QuickField>
         
          <QuickField name="status" field='select'>
            <option  disabled>Select Status: </option>
            <option value="pending_review">Pending Review</option>
            <option value="published">Published</option>
            <option value="declined">Declined</option>
          </QuickField>
         
          <QuickField name="source_link" label="Source Link" type='url' />
            
          <div style={formStyles.uploadToS3}>
            {currentImage}
            {this.props.children}
          </div>
          
          <p>{errors}</p>
          <ArtButton type='submit' label={submitLabel} />
        </div>

      </form>

    )
  }
}


ArtForm = reduxForm({
  fields: ['name', "creator", 'description', 'creation_date', 'category_name', 'source', 'status'],
  validate
})(ArtForm)

export default Radium(ArtForm)
