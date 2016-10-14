import React from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader-advanced';
import SearchResults from './searchResults.js'
import ImportArtForm from './ImportArtForm.js';
import {searchSource, importArt} from '../../actions/artImports.js';

const spinner = <span style={{fontSize: 100, color: 'black'}} className="fa-spinner fa fa-spin"></span>;
const sources = ['Discogs', 'Artsy', 'Gracenote', 'Philart', 'IMDB', 'HarvardArt'];

class ImportArtFormContainer extends React.Component{
  constructor(){
    super();
    this.submitForm = this.submitForm.bind(this);
    this.importArt = this.importArt.bind(this);
    this.selected = this.selected.bind(this);
    this.update = this.update.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }
  
  componentWillMount(){
   this.setState({
     query: "",
     source: "Discogs",
     formErrors: {
       query: [],
       source: []
     }
   });
  }
  
  
  selected(event, index, value){
    this.setState({
      source: value
    })
  }
  
  update(event, value){
    this.setState({
      query: value
    });
  }
  
  
  submitForm(e){
    e.preventDefault();
    
    this.validateForm() && this.props.submitForm(this.state.source, this.state.query);
  }
  
  validateForm(){
    if (this.state.query.length < 2) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          query: ['please enter a minimum of 2 letters']
        }
      })
      return false
    } else {
      this.setState({
        formErrors: {
          source: [],
          query: []
        }
      })
      return true
    }
  }
  
  importArt(id){
    this.props.importArt(id, this.state.source);
  }
  
 
  
  render(){
    return (
      <div id="searchArtContainer">
        <Loader backgroundStyle={{backgroundColor: 'white', opacity: 0.6}} show={this.props.loading}>
          <ImportArtForm 
            sources={sources} 
            selected_source={this.state.source} 
            selected={this.selected} 
            update={this.update} 
            submitForm={this.submitForm}
            errors={this.state.formErrors}
          />
          <SearchResults results={this.props.results} error={this.props.error} importArt={this.importArt} />
        </Loader>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  loading: store.artImportState.loading,
  loading_message: store.artImportState.loadingMessage,
  results: store.artImportState.results,
  listing_id: store.artImportState.listing_id,
  error: store.artImportState.error
});

const mapDispatchToProps = (dispatch) => ({
  submitForm(source, query){
    dispatch(searchSource(source, query))
  },
  importArt(id, source){
    dispatch(importArt(id, source));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportArtFormContainer)

