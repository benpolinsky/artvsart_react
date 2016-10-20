import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import Loader from 'react-loader-advanced';
import SearchResults from './searchResults.js'
import ImportArtForm from './ImportArtForm.js';
import {searchSource, importArt} from '../../actions/artImports.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress'

import loaderStyles from '../../styles/loader.js'

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
    
    const circularLoader = <MuiThemeProvider><CircularProgress /></MuiThemeProvider>;
    const sources = ['Discogs', 'Artsy', 'Gracenote', 'Philart', 'IMDB', 'HarvardArt'];
    
    return (
      <div id="searchArtContainer">
        <Loader backgroundStyle={loaderStyles.background} 
                foregroundStyle={loaderStyles.foreground} 
                show={this.props.loading} 
                message={circularLoader}>
                
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


ImportArtFormContainer.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  results: React.PropTypes.array.isRequired,
  listing_id: React.PropTypes.string.isRequired,
  error: React.PropTypes.string.isRequired,
  submitForm: React.PropTypes.func.isRequired,
  importArt: React.PropTypes.func.isRequired
}

const mapStateToProps = (store) => ({
  loading: store.artImportState.loading,
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

