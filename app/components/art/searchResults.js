import React from 'react';
import SearchResult from './searchResult.js';
import QuickError from '../quickErrors';
const mainStyles = {display: 'flex', flexFlow: 'row wrap', width: '100%', marginTop: 20};
const SearchResults = ({error, results, importArt}) => {
  return(
      <div style={mainStyles} id="searchResults">
        {error && <QuickError>{error}</QuickError>} 
        {results.map((result, index) => <SearchResult key={index} result={result} importArt={importArt}/>)}
      </div>
    )
}

SearchResults.propTypes = {
  error: React.PropTypes.string,
  results: React.PropTypes.array.isRequired,
  importArt: React.PropTypes.func.isRequired
}

export default SearchResults