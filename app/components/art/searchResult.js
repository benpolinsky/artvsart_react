import React from 'react';

import ArtButton from '../elements/button.js';

const SearchResult = ({result, importArt}) => {
  const label = result.imported ? "Imported!" : "Import"
  return(
    <div className='search-result' style={{width: 200, height: 300}}>
      <div className='image-container' style={{width: 150, height: 150, margin: '0 auto'}}>
        <img src={result.image}  style={{maxWidth: '100%', maxHeight: '100%', textAlign: "center"}}/>
      </div>
      
      <p style={{textAlign: 'center'}}>{result.year}</p>
      <h4 style={{textAlign: 'center'}}>{result.title}</h4>

      <ArtButton size="small" disabled={result.imported} action={importArt.bind(null, result.id)} label={label} />

  
    </div>
  )
}

SearchResult.propTypes = {
  result: React.PropTypes.object.isRequired,
  importArt: React.PropTypes.func.isRequired
}

export default SearchResult