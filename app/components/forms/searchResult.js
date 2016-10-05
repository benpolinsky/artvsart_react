import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const SearchResult = ({result, importArt}) => {
  const label = result.imported ? "Imported!" : "Import"
  return(
    <div className='search-result'>
      <div className='image-container'>
        <img src={result.image} />
      </div>
      
      <p>{result.year}</p>
      <h4>{result.title}</h4>
      <MuiThemeProvider>
        <RaisedButton disabled={result.imported} onClick={importArt.bind(null, result.id)} label={label} />
      </MuiThemeProvider>
  
    </div>
  )
}
export default SearchResult