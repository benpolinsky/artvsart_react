import React from 'react';
import SearchResult from './searchResult.js';
import QuickError from '../quickErrors';

const mainStyles = {display: 'flex', flexFlow: 'row wrap', width: '100%', marginTop: 20};

const SearchResults = ({errors, results, importArt}) => {
  return(
      <div>      
        {errors.length > 0 && errors.map((error, index) => <QuickError key={index}>{error}</QuickError>)}
        <div style={mainStyles} id="searchResults">
          {results.map((result, index) => <SearchResult key={index} result={result} importArt={importArt}/>)}
        </div>
      </div>
    )
}

SearchResults.propTypes = {
  errors: React.PropTypes.array,
  results: React.PropTypes.array.isRequired,
  importArt: React.PropTypes.func.isRequired
}

export default SearchResults