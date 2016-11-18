import React from 'react';
import {Link} from 'react-router';
import ArtButton from '../elements/button.js';
import {linkButton} from '../../styles/buttons.js';


const SearchResult = ({result, importArt}) => {
  return(
    <div className='search-result' style={{width: 200, height: 300, textAlign: 'center'}}>
      <div className='image-container' style={{width: 150, height: 150, margin: '0 auto', textAlign: "center"}}>
        <img src={result.image}  style={{maxWidth: '100%', maxHeight: '100%', textAlign: "center"}}/>
      </div>
      
      <p style={{textAlign: 'center', height: 'auto', fontSize: 13}}>{result.year}</p>
      <h4 style={{textAlign: 'center', height: 70, overflowX: 'hidden', overflowY: 'auto', fontSize: 12, lineHeight: '1.3'}}>{result.title}</h4>

  {
    result.imported ?
    <Link style={linkButton} to={`/art/${result.art_id}/edit`}>Edit</Link>
    :
    <ArtButton kind="small"  
              action={importArt.bind(null, result.id)} 
              label="Import"/>
  }
      
    </div>
  )
}

SearchResult.propTypes = {
  result: React.PropTypes.object.isRequired,
  importArt: React.PropTypes.func.isRequired
}

export default SearchResult