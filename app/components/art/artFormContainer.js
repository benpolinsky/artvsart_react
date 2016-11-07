import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {Router} from 'react-router';
import Loader from 'react-loader-advanced';
import ReactS3Uploader from 'react-s3-uploader';
import ArtForm from './ArtForm.js';
import {createNewArt, fetchArt, resetArt, updateArt} from '../../actions/art.js';
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
      if (nextProps.location.pathname == '/art/new') {
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
        
        (nextProps.art.id == 0) && this.props.loadArt(nextProps.params.id);
      }
    }
  }
  
  componentDidMount(){
    this.toggleLoader(false);
    this.props.fetchCategories()
    if (this.props.location.pathname == '/art/new') {
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
      
      (this.props.art.id == 0) && this.props.loadArt(this.props.params.id);
    }
  }
  
  submitArtForm(data){
    if (this.props.location.pathname == "/art/new") {
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
    
    const dataWithImage = {
      ...data,
      image: art_image
    }
    this.props.updateArt(dataWithImage, this.context.router)
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
    console.log(percent)
    this.setState({
      uploadProgress: percent
    });
  }
  
  render(){    
    let artInitialValues = {...this.props.art, creation_date: new Date(this.props.art.creation_date)};
    const progressIndicator = <MuiThemeProvider>
                                 <LinearProgress
                                   mode='determinate'
                                   value={this.state.uploadProgress}
                                  />
                              </MuiThemeProvider>
    
    return (
      <Loader 
        foregroundStyle={loaderStyles.foreground} 
        backgroundStyle={loaderStyles.background} 
        message={progressIndicator} 
        show={this.state.loading}
       >
      
        <ArtForm initialValues={artInitialValues}
         categories={this.props.categories}
         art={this.props.art} 
         enableReinitialize
         formTitle={this.state.formTitle}
         submitLabel={this.state.submitLabel}
         form="newArt" 
         errors={this.state.file_errors} 
         submit={this.submitArtForm} 
         triggerLoader={this.toggleLoader} >
            
        <ReactS3Uploader
          signingUrl="/api/v1/s3/sign"
          accept="image/*"
          preprocess={this.onUploadStart}
          onProgress={this.onUploadProgress}
          onError={this.onUploadError}
          onFinish={this.onUploadFinish}
          signingUrlHeaders={storage.tokenObject()}
          server={process.env.API_URL} 
        />
        
       </ArtForm>
            
      </Loader>
    )
  }
}

ArtFormContainer.contextTypes = {
  router: React.PropTypes.object,
  store: React.PropTypes.object
}
  
const mapStateToProps = (store) => ({
  art: store.artState.art,
  categories: store.categories.records
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
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Radium(ArtFormContainer))