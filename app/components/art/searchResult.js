import React from 'react';
import Radium, {StyleRoot} from 'radium';
import {Link} from 'react-router';
import ArtButton from '../elements/button.js';
import {linkButton} from '../../styles/buttons.js';
import Grid from '../../styles/grid.js';

const footer = (result, importArt) => {
  if (result.imported) {
    return <Link style={linkButton} to={`/art/${result.art_id}/edit`}>Edit</Link>;
  } else {
    return <ArtButton kind="small"  action={importArt.bind(null, result.id)} label="Import" />;
  }
}

const SearchResult = ({result, importArt}) => {  
  return(
      <div className='search-result' style={{width: 200, height: 300, textAlign: 'center', ...Grid.twoUp}}>
        
        <div className='image-container' style={{margin: '0 auto', textAlign: "center", ...Grid.twoUp.imageContainer}}>
          <img src={result.image}  style={{maxWidth: '100%', maxHeight: '100%', textAlign: "center"}}/>
        </div>
      
        <p style={{textAlign: 'center', height: 'auto', fontSize: 13}}>{result.year}</p>
        <h4 style={{textAlign: 'center', height: 70, overflowX: 'hidden', overflowY: 'auto', fontSize: 12, lineHeight: '1.3'}}>{result.title}</h4>
        
        {footer(result, importArt)}
      </div>
  )
}

SearchResult.propTypes = {
  result: React.PropTypes.object.isRequired,
  importArt: React.PropTypes.func.isRequired
}

export default Radium(SearchResult)