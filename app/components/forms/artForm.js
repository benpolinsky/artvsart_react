import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {TextField} from 'redux-form-material-ui';
import {DatePicker} from 'redux-form-material-ui';
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

class ArtForm extends React.Component{
  constructor(){
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }  
  
  onSubmit(data){
    this.props.handleSubmit(this.props.submit(data));
  }
  
  render(){
    const {submit, handleSubmit, errors, art, formTitle, submitLabel} = this.props;
    const currentImage = (art && art.image && <div><p>Current Image: </p> <br/> <img src={art.image} /></div>)
    
    return(
     <MuiThemeProvider>
      <form onSubmit={handleSubmit(this.onSubmit)} className='createArtForm centered-form'>
        <h1 className='mainTitle'>{formTitle}</h1>
        <div className='fields'>
            <Field name='name' floatingLabelText="Name" component={TextField} style={textFieldStyles} />
            <Field name='creator' floatingLabelText="Creator" component={TextField} style={textFieldStyles} />
            <Field name='description' floatingLabelText="Description" component={TextField} multiLine={true} style={textFieldStyles}  />
            <Field name='creation_date' value={new Date('2-10-2016')} floatingLabelText={this.props.art.creation_date} component={DatePicker} style={textFieldStyles}  />
            
            <Field name='category_name' floatingLabelText="Category" component={SelectField} style={textFieldStyles} >
              <MenuItem value="art" primaryText="Art"/>
              <MenuItem value="music" primaryText="Music"/>
              <MenuItem value="movie" primaryText="Movie"/>
              <MenuItem value="show" primaryText="TV Show or Series"/>
            </Field>
            
            <Field name='source' floatingLabelText="Source" component={SelectField} style={textFieldStyles} >
              <MenuItem value="discogs" primaryText="Discogs"/>
              <MenuItem value="imdb" primaryText="IMDB"/>
              <MenuItem value="artsy" primaryText="Artsy"/>
              <MenuItem value="harvard" primaryText="Harvard Art Gallery"/>
              <MenuItem value="philart" primaryText="Philart"/>
              <MenuItem value="other" primaryText="Other"/>
            </Field>
    
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
  fields: ['name', "creator", 'description'],
  validate
})(ArtForm)

export default ArtForm
