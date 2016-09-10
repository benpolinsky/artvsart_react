import React from 'react';

class SearchResult extends React.Component{
  importArt(){
    this.props.importArt(this.props.result.id)
  }
  
  render(){
    return(
      <div className='search-result col-xs-12 col-sm-4'>
        <div className='image-container'>
          <img src={this.props.result.image} />
        </div>
        
        <p>{this.props.result.year}</p>
        <h4>{this.props.result.title}</h4>

        <button className='import btn btn-primary btn-sm' onClick={this.importArt.bind(this)}>Import</button>
      </div>
    )
  }
}

export default SearchResult