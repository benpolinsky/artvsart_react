// It would be nice to refactor the conditionals determining 
// if we're on the edit or new path
// either look at react-router transitions (or another 'onload' dealie)
// or extract to two different containers
// but now we're dealing with the situation of loading this into a sidebar 
// from the art/import page....


import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Loader from 'react-loader-advanced';
import ReactS3Uploader from 'react-s3-uploader';

import ArtForm from './ArtForm.js';
import PrevNextNav from './prevNextNav.js';
import ArtNav from './artNav.js';
import DefaultLoader from '../defaultLoader.js'

import {createNewArt, fetchArt, resetArt, updateArt, searchWikipedia} from '../../actions/art.js';
import {categoriesRequest} from '../../actions/categories.js'
import {storeSignedUrl} from '../../actions/art.js';

import * as storage from '../../utils/localStorage.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LinearProgress from 'material-ui/LinearProgress'

import loaderStyles from '../../styles/loader.js'

class ArtFormContainer extends React.Component {
  constructor(){
    super();
    this.submitArtForm = this.submitArtForm.bind(this);
    this.createNewArt = this.createNewArt.bind(this);
    this.onUploadFinish = this.onUploadFinish.bind(this);
    this.onUploadStart = this.onUploadStart.bind(this);
    this.onUploadProgress = this.onUploadProgress.bind(this);
    this.toggleLoader = this.toggleLoader.bind(this);
    this.showArt = this.showArt.bind(this);
    this.scrollToErrors = this.scrollToErrors.bind(this);
  }
  
  componentWillMount(){
    this.state = {
      loading: true,
      uploadProgress: 0,
      file_errors: '',
      formTitle: "Add Art",
      submitLabel: "Create",
      art: {
        image: ""
      }
    }
  }
  
  componentWillReceiveProps(nextProps){
    if (nextProps != this.props) {
      this.setupForms(nextProps);
    }
  }
  
  componentDidMount(){
    this.toggleLoader(false);
    this.props.fetchCategories()
    this.setupForms(this.props);
  }

  // so this is no good.
  // You should reconsider the component design
  
  setupForms(props){
    if (props.location && props.location.pathname == '/art/new') {
      this.setState({
        formTitle: "Add Art",
        submitLabel: "Create"
      });
      this.props.resetArt()
    } else {      
      this.setState({
        formTitle: "Edit Art",
        submitLabel: "Update"
      });      

      if (!this.props.fetching && !props.fetching) {

        if (props.params && props.params.id) {

          this.props.loadArt(props.params.id);
        } else if (props.artId) {

          this.props.loadArt(props.artId);
        }
      }
    }
  }
  
  submitArtForm(data){
    if (this.props.location && this.props.location.pathname == "/art/new") {
      this.createNewArt(data)
    } else {
      this.updateArt(data)
    }
  }
  
  createNewArt(data){
    if (!this.state.art.image) {
      this.setState({file_errors: "Please upload an image"})
      return false
    }
    
    const dataWithImage = {
      ...data, 
      image: this.state.art.image
    }
    this.props.createNewArt(dataWithImage, this.context.router);
  }
  
  updateArt(data){
    if (!this.state.art.image) {
      if (!this.props.art.image) {
        this.setState({file_errors: "Please upload an image"})
        return false        
      } else {
        var art_image = this.props.art.image
      }
    } else { 
      var art_image = this.state.art.image
    }
    
    const formattedData = {
      ...data,
      image: art_image
    }
    
    if (this.props.fromImport) {
      this.props.updateArt(formattedData);
    } else {
      this.props.updateArt(formattedData, this.context.router)
    }
    
    
  }
  
  showArt(){
    this.context.router.push(`/art/${this.props.art.id}`)
  }
  
  toggleLoader(loading, callback){
    this.setState({
      loading: loading
    }, callback)
  }

  
  onUploadStart(file, next){
    this.toggleLoader(true);
    next(file);
  }


  onUploadFinish(file){
    // same with this, no need to call the store, we'll keep the state locally.
    this.toggleLoader(false, () => {
      const signed_url = file.signedUrl.split('?X-Amz-Expires')[0];
      
      this.setState({
        art: {
          ...this.props.art,
          image: signed_url
        }
      })
    }); 
  }
  
  onUploadProgress(percent){
    this.setState({
      uploadProgress: percent
    });
  }
  
  scrollToErrors(errors){
    if (errors){
      document.getElementById(Object.keys(errors)[0]).focus();
    }
    
  }

  
  render(){    
    const progressIndicator = <MuiThemeProvider>
                                <div>
                                  <p style={{color: 'black', fontSize: 110}}>{`${this.state.uploadProgress}%`}</p>
                                  <LinearProgress
                                  mode='determinate'
                                  value={this.state.uploadProgress}
                                  />
                                </div>
                              </MuiThemeProvider>
    
    return (
    <DefaultLoader showing={this.props.fetching}>
      <Loader 
        foregroundStyle={loaderStyles.foreground} 
        backgroundStyle={loaderStyles.background} 
        message={progressIndicator} 
        show={this.state.loading}
       >
        <ArtNav art={this.props.art} />
        <ArtForm initialValues={this.props.art}
         categories={this.props.categories}
         art={this.props.art} 
         enableReinitialize
         formTitle={this.state.formTitle}
         submitLabel={this.state.submitLabel}
         form="newArt" 
         errors={this.state.file_errors} 
         submit={this.submitArtForm} 
         triggerLoader={this.toggleLoader} 
         onSubmitFail={this.scrollToErrors}
         fetchFromWiki={this.props.searchWikipedia.bind(this, this.props.art.name)}
         wikipediaDescription={this.props.wikipediaDescription}
         >
            
        <ReactS3Uploader
          signingUrl="/api/v1/s3/sign"
          accept="image/*"
          preprocess={this.onUploadStart}
          onProgress={this.onUploadProgress}
          onError={this.onUploadError}
          onFinish={this.onUploadFinish}
          signingUrlHeaders={storage.tokenObject()}
          server={process.env.API_URL}
          style={{width: '100%'}}
        />
        
       </ArtForm>
       

       {this.props.location && this.props.location.pathname != '/art/new' && <PrevNextNav art={this.props.art} />}
       
      </Loader>
    </DefaultLoader>
    )
  }
}

ArtFormContainer.contextTypes = {
  router: React.PropTypes.object,
  store: React.PropTypes.object
}
  
const mapStateToProps = (store) => ({
  art: store.artState.art,
  categories: store.categories.records,
  fetching: store.artState.fetching,
  wikipediaDescription: store.artState.wikipediaDescription
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories(){
    dispatch(categoriesRequest())
  },
  createNewArt(art, router){
    dispatch(createNewArt(art, router));
  },
  updateArt(art, router){
    dispatch(updateArt(art, router));
  },
  loadArt(id){
    dispatch(fetchArt(id));
  },
  resetArt(){
    dispatch(resetArt())
  },
  searchWikipedia(name){
    dispatch(searchWikipedia(name))
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Radium(ArtFormContainer))