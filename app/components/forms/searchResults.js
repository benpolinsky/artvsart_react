import React from 'react';
import SearchResult from './searchResult.js';

const SearchResults = ({error, results, importArt}) => {
  return(
      <div id="searchResults">
        {error && <div className='ava-alert'>{error}</div>} 
        {results.map((result, index) => <SearchResult key={index} result={result} importArt={importArt}/>)}
      </div>
    )
}

export default SearchResults