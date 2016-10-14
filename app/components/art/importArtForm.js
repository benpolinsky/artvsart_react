import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const ImportArtForm = ({submitForm, selected_source, selected, sources, update, errors}) => {
  const source_label = `search_${selected_source.toLowerCase()}`;
  return (
    <form onSubmit={submitForm} className='centered-form'>
      <h1 className='mainTitle'>Import Art</h1>
      <div>
        <MuiThemeProvider>  
          <div className='fields'>
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

export default ImportArtForm

