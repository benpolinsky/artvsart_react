import React from 'react';
import SearchResult from './searchResult.js';
import {QuickError} from '../quickErrors';
const SearchResults = ({error, results, importArt}) => {
  return(
      <div id="searchResults">
        {error && <QuickError>{error}</QuickError>} 
        {results.map((result, index) => <SearchResult key={index} result={result} importArt={importArt}/>)}
      </div>
    )
}

export default SearchResults