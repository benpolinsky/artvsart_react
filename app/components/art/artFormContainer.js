import React from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';
import Loader from 'react-loader-advanced';
import ReactS3Uploader from 'react-s3-uploader';
import ArtForm from './ArtForm.js';
import {createNewArt, fetchArt, resetArt, updateArt} from '../../actions/art.js';
import {categoriesRequest} from '../../actions/categories.js'
import {storeSignedUrl} from '../../actions/art.js';
import * as storage from '../../localStorage.js';

class ArtFormContainer extends React.Component {
  constructor(){
    super();
    this.submitArtForm = this.submitArtForm.bind(this);
    this.createNewArt = this.createNewArt.bind(this);
    this.onUploadFinish = this.onUploadFinish.bind(this);
    this.onUploadStart = this.onUploadStart.bind(this);
    this.toggleLoader = this.toggleLoader.bind(this);
    
  }
  
  componentWillMount(){
    this.state = {
      loading: true,
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
  
  render(){
    let artInitialValues = this.props.art;
    artInitialValues.creation_date = new Date(artInitialValues.creation_date)
    return (
      <Loader show={this.state.loading} message={'loading'} foregroundStyle={{color: 'white'}} backgroundStyle={{backgroundColor: 'black'}} >
    <ArtForm initialValues={artInitialValues}
           categories={this.props.categories}
           art={this.props.art} 
           enableReinitialize={true} 
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
            server="http://localhost:3000" />
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


export default connect(mapStateToProps, mapDispatchToProps)(ArtFormContainer)