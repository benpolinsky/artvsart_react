import React from 'react';

class SearchResult extends React.Component{
  importArt(){
    this.props.importArt(this.props.result.id)
  }
  
  render(){
    return(
      <div className='search-result'>
        <h4>{this.props.result.title}</h4>
        <img src={this.props.result.thumb} />
        <p>
          {this.props.result.year}
        </p>
          <button className='btn btn-primary btn-sm' onClick={this.importArt.bind(this)}>Import</button>
      </div>
    )
  }
}

export default SearchResult