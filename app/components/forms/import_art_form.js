// 1. when selected we populate with appropriate fields
// a: general search
// b: specific id
// 2. return results in a new component
// 3. when selected in new component you import

// So this is more of a SearchArtForm (kinda)

import React from 'react';
import $ from 'domtastic';
import SearchSource from './search_source.js';
import SearchResult from './search_result.js'
import AjaxHelpers from '../../utils/ajax_helpers.js';


class ImportArtForm extends React.Component{
  constructor(){
    super();
    this.submitForm = this.submitForm.bind(this);
    this.displayResponse = this.displayResponse.bind(this);
    this.importArt = this.importArt.bind(this);
  }
  
  selected(e){
    var selection = e.target.value.toLowerCase();
    $('.import-group').addClass('hidden');
    $(`#${selection}`).removeClass('hidden');
  }
  
  submitForm(data){
    AjaxHelpers.searchSource(data).then((response) => {this.displayResponse(response)});
  }
  
  displayResponse(data){
    console.log(data);
    this.setState({
      new_data: true,
      results: data.results
    })
  }
  
  importArt(id){
    console.log(id, this.refs.importSource.value);
    AjaxHelpers.importArt(id, this.refs.importSource.value);
  }
  
  componentWillMount(){
    this.state = {
      new_data: false,
      results: []
    }
  }
  
  
  render(){
    const sources = ['Discogs', 'Artsy', 'Gracenote'];
    return (
      <div id="searchArtContainer">
        <form onSubmit={this.submitForm} className='import-art col-xs-12'>
          <div className="form-group">
            <select name="import-source" ref="importSource" defaultValue="" onChange={this.selected} className='form-control'>
              <option value=''>Please Select</option>
              {sources.map(source => <option key={source} value={source}>{source}</option>)}
            </select>
          </div>
          {sources.map(source => <SearchSource key={source} searchForm={this.submitForm} source={source} />)}
        </form>
          { 
            this.state.new_data == true &&
            <div id="searchResults">
              {this.state.results.map((result, index) => <SearchResult key={index} result={result} importArt={this.importArt}/>)}
            </div>            
          }

      </div>
    )
  }
}

export default ImportArtForm

