import React from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';
import Loader from 'react-loader-advanced';
import ReactS3Uploader from 'react-s3-uploader';
import ArtForm from '../forms/ArtForm.js';
import {createNewArt} from '../../actions/art.js';
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
      art: {
        image: ""
      }
    }
  }
  
  componentDidMount(){
    this.toggleLoader(false);
  }
  
  submitArtForm(data){
    debugger
    if (this.props.location.pathname == "/add_new_art") {
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

  
  handleResponse(response){
    this.context.router.push(`/art/${response.art.id}`)
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
          image: signed_url
        }
      })
    }); 
  }
  
  render(){
    return (
      <Loader show={this.state.loading} message={'loading'} foregroundStyle={{color: 'white'}} backgroundStyle={{backgroundColor: 'black'}} >
        <ArtForm form="newArt" update={this.updateArtValues} errors={this.state.file_errors} submit={this.submitArtForm} triggerLoader={this.toggleLoader}>
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
  art: store.form.newArtForm
});

const mapDispatchToProps = (dispatch) => ({
  createNewArt(art, router){
    dispatch(createNewArt(art, router));
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(ArtFormContainer)