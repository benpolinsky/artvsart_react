import React from 'react';
import SearchFields from './searchFields.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const ImportArtForm = ({submitForm, selected_source, selected, sources, update}) => {
  return (
    <form onSubmit={submitForm} className='import-art'>
      <h2>Import Art</h2>
      <div>
        <MuiThemeProvider>  
          <SelectField name="import-source" value={selected_source} onChange={selected}>
            {sources.map(source => <MenuItem key={source} primaryText={source} value={source}/>)}
          </SelectField>
        </MuiThemeProvider>  
        
        <SearchFields update={update} source={selected_source} />
        <MuiThemeProvider>  
          <RaisedButton primary={true} type="submit" label='Search'/>
        </MuiThemeProvider>  
      </div>
    </form>
  )
}

export default ImportArtForm

