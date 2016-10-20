import React from 'react';
import Radium from 'radium';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import baseStyles from '../../styles/base.js'
import formStyles from '../../styles/forms.js'

const ImportArtForm = ({submitForm, selected_source, selected, sources, update, errors}) => {
  const source_label = `search_${selected_source.toLowerCase()}`;
  return (
    <form onSubmit={submitForm} style={formStyles.centered}>
      <h1 style={baseStyles.mainTitle}>Import Art</h1>
      <div>
        <MuiThemeProvider>  
          <div style={formStyles.centered.fields}>
            <SelectField errorText={errors.source.join(", ")} name="import-source" value={selected_source} onChange={selected}>
              {sources.map(source => <MenuItem key={source} primaryText={source} value={source}/>)}
            </SelectField><br/>
            <TextField type='search'  errorText={errors.query.join(", ")} floatingLabelText="Query" onChange={update} defaultValue="" name={source_label} />
          </div>
        </MuiThemeProvider>  
        
        <MuiThemeProvider>  
          <RaisedButton primary={true} type="submit" label='Search'/>
        </MuiThemeProvider>  
      </div>
    </form>
  )
}

ImportArtForm.propTypes = {
  submitForm:  React.PropTypes.func.isRequired,
  selected_source: React.PropTypes.string.isRequired,
  selected: React.PropTypes.func.isRequired,
  sources: React.PropTypes.array.isRequired,
  update: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
}


export default Radium(ImportArtForm)

