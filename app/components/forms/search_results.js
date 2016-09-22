import React from 'react';
import SearchResult from './search_result.js';

const SearchResults = ({error, results, importArt}) => {
  return(
      <div id="searchResults" className='col-xs-12'>
        {error && <div className='ava-alert alert alert-danger'>{error}</div>} 
        {results.map((result, index) => <SearchResult key={index} result={result} importArt={importArt}/>)}
      </div>
    )
}

export default SearchResults