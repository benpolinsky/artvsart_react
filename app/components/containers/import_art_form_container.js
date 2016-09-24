import React from 'react';
import Loader from 'react-loader-advanced';
import SearchFields from '../forms/search_fields.js';
import SearchResults from '../forms/search_results.js'
import {importArt, searchSource} from '../../utils/ajax_helpers.js';
import ImportArtForm from '../forms/import_art_form.js';

const spinner = <span className="fa-spinner fa">SPNNNNNN</span>;
const sources = ['Discogs', 'Artsy', 'Gracenote', 'Philart', 'IMDB', 'HarvardArt'];

class ImportArtFormContainer extends React.Component{
  constructor(){
    super();
    this.submitForm = this.submitForm.bind(this);
    this.displayResponse = this.displayResponse.bind(this);
    this.importArt = this.importArt.bind(this);
    this.selected = this.selected.bind(this);
    this.update = this.update.bind(this);
    this.importFinished = this.importFinished.bind(this);
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
    this.setState({loading: true, loading_message: `Searching ${data.source}`});
    searchSource(data).then((response) => {this.displayResponse(response)});
  }
  
  update(query){
    this.setState({
      query: query
    });
  }
  
  displayResponse(data){
    if (data.results.error != undefined) {
      this.setState({
        new_data: false,
        results: [],
        loading: false,
        loading_message: 'loading',
        error: data.results.error
      });
    } else {    
      this.setState({
        new_data: true,
        results: data.results,
        loading: false,
        loading_message: 'loading',
        error: null
      });
    }
  }
  
  importArt(id){
    this.setState({loading: true});
    importArt(id, this.state.selected).then(response => {
      this.importFinished(response);
    });
  }
  
  importFinished(response){
    this.setState({loading: false});
    console.log(response);
  }
  
  componentWillMount(){
    this.state = {
      new_data: false,
      loading: false,
      loading_message: "loading",
      results: [],
      selected: 'Discogs',
      query: "",
      listing_id: ""
    }
  }
  
  
  render(){
    return (
      <div id="searchArtContainer">
        <Loader show={this.state.loading} message={spinner}  >
          <ImportArtForm sources={sources} selected_source={this.state.selected} selected={this.selected} update={this.update} submitForm={this.submitForm}/>
          <SearchResults results={this.state.results} error={this.state.error} importArt={this.importArt} new_data={this.state.new_data}/>

        </Loader>
      </div>
    )
  }
}

export default ImportArtFormContainer

