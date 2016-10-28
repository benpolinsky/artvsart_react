import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const SearchResult = ({result, importArt}) => {
  const label = result.imported ? "Imported!" : "Import"
  return(
    <div className='search-result' style={{width: 200, height: 300}}>
      <div className='image-container' style={{width: 150, height: 150}}>
      <img src={result.image}  style={{maxWidth: '100%', maxHeight: '100%'}}/>
      </div>
      
      <p>{result.year}</p>
      <h4>{result.title}</h4>
      <MuiThemeProvider>
        <RaisedButton disabled={result.imported} onClick={importArt.bind(null, result.id)} label={label} />
      </MuiThemeProvider>
  
    </div>
  )
}

SearchResult.propTypes = {
  result: React.PropTypes.object.isRequired,
  importArt: React.PropTypes.func.isRequired
}

export default SearchResult