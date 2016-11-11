// this was before I began using redux-form...

import React from 'react';
import Radium from 'radium';
import TextField from 'material-ui/TextField';
import ArtButton from '../elements/button.js';
import baseStyles from '../../styles/base.js'
import formStyles from '../../styles/forms.js'

const ImportArtForm = ({submitForm, selected_source, selected, sources, update, errors}) => {
  const source_label = `search_${selected_source.toLowerCase()}`;
  return (
    <form onSubmit={submitForm} style={formStyles.centered}>
      <h1 style={baseStyles.mainTitle}>Import Art</h1>
      <div>

          <div style={formStyles.centered.fields}>
            <div style={formStyles.fieldContainer}>
              <select name="import-source" value={selected_source} style={formStyles.basicField} onChange={selected}>
                {sources.map(source => <option key={source} value={source}>{source}</option>)}
              </select>
            </div>
             <div style={formStyles.fieldContainer}>
               <label htmlFor={source_label} style={formStyles.label}>Search {selected_source} </label>
              <div>
                {errors.query && errors.query.map((error, index) => {return <span key={index}>{error}</span>})}
               <input type='search' style={formStyles.basicField} onChange={update}  name={source_label} />
              </div>
             </div>
              
          </div>

          <ArtButton type="submit" label='Search'/>

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

