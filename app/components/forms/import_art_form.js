// 1. when selected we populate with appropriate fields
// a: general search
// b: specific id
// 2. return results in a new component
// 3. when selected in new component you import

// So this is more of a SearchArtForm (kinda)

import React from 'react';
import SearchFields from './search_fields.js';
import SearchResult from './search_result.js'
import AjaxHelpers from '../../utils/ajax_helpers.js';


class ImportArtForm extends React.Component{
  constructor(){
    super();
    this.submitForm = this.submitForm.bind(this);
    this.displayResponse = this.displayResponse.bind(this);
    this.importArt = this.importArt.bind(this);
    this.selected = this.selected.bind(this);
    this.update = this.update.bind(this);
  }
  
  selected(e){
    this.setState({
      selected: e.target.value
    })
  }
  
  submitForm(e){
    e.preventDefault();
    let data = {
      source: this.state.selected,
      query: this.state.query
    }
    AjaxHelpers.searchSource(data).then((response) => {this.displayResponse(response)});
  }
  
  update(state){
    this.setState({
      query: state.query,
      listing_id: state.listing_id
    })
  }
  
  displayResponse(data){
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
      results: [],
      selected: 'Discogs',
      query: "",
      listing_id: ""
    }
  }
  
  
  render(){
    const sources = ['Discogs', 'Artsy', 'Gracenote', 'Philart', 'IMDB'];
    return (
      <div id="searchArtContainer">
        <form onSubmit={this.submitForm} className='import-art col-xs-12'>
    
          <div className="form-group">
            <select name="import-source" ref="importSource" defaultValue={this.state.selected} onChange={this.selected} className='form-control'>
              <option value=''>Please Select</option>
              {sources.map(source => <option key={source} value={source}>{source}</option>)}
            </select>
          </div>
          
          {sources.map(source => {
            return <SearchFields active={this.state.selected == source} 
                                 ref={source} 
                                 key={source}
                                 update={this.update}
                                 source={source} />
          })}
          
          <div className="form-group">
            <input className="btn btn-primary" type="submit" value='Search'/>
          </div>
          
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

