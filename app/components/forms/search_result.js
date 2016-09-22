import React from 'react';

const SearchResult = ({result, importArt}) => {
  return(
    <div className='search-result col-xs-12 col-sm-4'>
      <div className='image-container'>
        <img src={result.image} />
      </div>
      
      <p>{result.year}</p>
      <h4>{result.title}</h4>

      <button className='import btn btn-primary btn-sm' onClick={importArt.bind(null, result.id)}>Import</button>
    </div>
  )
}
export default SearchResult