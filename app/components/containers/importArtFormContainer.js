import React from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader-advanced';
import SearchFields from '../forms/searchFields.js';
import SearchResults from '../forms/searchResults.js'
import ImportArtForm from '../forms/ImportArtForm.js';
import {searchSource} from '../../actions/artImports.js';

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
      source: e.target.value
    })
  }
  
  update(query){
    this.setState({
      query: query
    });
  }
  
  
  submitForm(e){
    e.preventDefault();
    this.props.submitForm(this.state.source, this.state.query);
  }
  
  
  // move to results action
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
  }
  
  componentWillMount(){
   this.setState({
     query: "",
     source: "Discogs"
   });
  }
  
  
  render(){
    return (
      <div id="searchArtContainer">
        <Loader show={this.props.loading} message={spinner}  >
          <ImportArtForm sources={sources} selected_source={this.state.source} selected={this.selected} update={this.update} submitForm={this.submitForm}/>
          <SearchResults results={this.props.results} error={this.props.error} importArt={this.importArt} new_data={this.props.new_data}/>

        </Loader>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  new_data: store.artImportState.new_data,
  loading: store.artImportState.loading,
  loading_message: store.artImportState.loadingMessage,
  results: store.artImportState.results,
  listing_id: store.artImportState.listing_id
});

const mapDispatchToProps = (dispatch) => ({
  submitForm(source, query){
    dispatch(searchSource(source, query))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportArtFormContainer)

