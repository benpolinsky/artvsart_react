import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {TextField} from 'redux-form-material-ui';
import DatePicker from 'material-ui/DatePicker';
import {SelectField} from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
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

const MyDatePicker = ({input}) => <DatePicker name={input.name} value={input.value} onChange={(e, value) => input.onChange(value)} />

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
     <MuiThemeProvider>
      <form onSubmit={handleSubmit(this.onSubmit)} className='createArtForm centered-form'>
        <h1 className='mainTitle'>{formTitle}</h1>
        <div className='fields'>
            <Field name='name' floatingLabelText="Name" component={TextField} style={textFieldStyles} />
            <Field name='creator' floatingLabelText="Creator" component={TextField} style={textFieldStyles} />
            <Field name='description' floatingLabelText="Description" component={TextField} multiLine={true} style={textFieldStyles}  />
            <Field name='creation_date' floatingLabelText="Creation Date" component={MyDatePicker} style={textFieldStyles}  />
            
            <Field name='category_name' floatingLabelText="Category" component={SelectField} style={textFieldStyles} >
              {categories.map((category) => {
                return <MenuItem key={category.id} value={category.name} primaryText={category.name}/>
              })}
            </Field>
            
            <Field name='source' floatingLabelText="Source" component={SelectField} style={textFieldStyles} >
              <MenuItem value="discogs" primaryText="Discogs"/>
              <MenuItem value="imdb" primaryText="IMDB"/>
              <MenuItem value="artsy" primaryText="Artsy"/>
              <MenuItem value="harvard" primaryText="Harvard Art Gallery"/>
              <MenuItem value="philart" primaryText="Philart"/>
              <MenuItem value="other" primaryText="Other"/>
            </Field>

            <Field name='source_link' floatingLabelText="Source Link" component={TextField} style={textFieldStyles} />
              
            <div className="uploadToS3">
              {currentImage}
              {this.props.children}
            </div>
              <p>{errors}</p>
            <RaisedButton fullWidth={true} primary={true} style={textFieldStyles} type="submit" label={submitLabel} />
        </div>

      </form>
    </MuiThemeProvider>
    )
  }
}



ArtForm = reduxForm({
  fields: ['name', "creator", 'description', 'creation_date', 'category_name', 'source'],
  validate
})(ArtForm)

export default ArtForm
