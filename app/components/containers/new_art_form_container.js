// essentially the NewArtFormContainer
import React from 'react';
import {connect} from 'react-redux';
import store from '../../store.js';
import {Router} from 'react-router';
import Loader from 'react-loader-advanced';
import ReactS3Uploader from 'react-s3-uploader';
import NewArtForm from '../forms/new_art_form.js';
import AjaxHelpers from '../../utils/ajax_helpers.js';


export default class NewArtFormContainer extends React.Component {
  constructor(){
    super();
    this.createNewArt = this.createNewArt.bind(this);
    this.onUploadFinish = this.onUploadFinish.bind(this);
    this.onUploadStart = this.onUploadStart.bind(this);
    this.toggleLoader = this.toggleLoader.bind(this);
    this.updateArtValues = this.updateArtValues.bind(this);
  }

  componentWillMount(){
    this.state = {
      loading: true
    }
    this.toggleLoader(false);
  }
  
  createNewArt(e){
    e.preventDefault();
    this.toggleLoader(true);
    AjaxHelpers.createNewArt(this.props.art).then((response) => {
      this.toggleLoader(false);
      return (this.handleResponse(response))
    })
  }
  
  handleResponse(response){
    this.context.router.push(`/art/${response.art.id}`)
  }
  
  toggleLoader(loading, callback){
    this.setState({
      loading: loading
    }, callback)
  }
  
  updateArtValues(art){
    store.dispatch({
      type: "UPDATE_ART_VALUES",
      art: art
    });
  }
  
  onUploadStart(file, next){
    this.toggleLoader(true);
    next(file);
  }


  onUploadFinish(file){
    this.toggleLoader(false, () => {
      const signed_url = file.signedUrl.split('?X-Amz-Expires')[0];
      store.dispatch({
        type: "ADD_IMAGE_URL",
        url: signed_url
      })
    }); 
  }
  
  render(){
    return (
      <Loader show={this.state.loading} message={'loading'} foregroundStyle={{color: 'white'}} backgroundStyle={{backgroundColor: 'black'}} >
        <NewArtForm update={this.updateArtValues} submit={this.createNewArt} art={this.props.art} triggerLoader={this.toggleLoader}>
          <ReactS3Uploader
            signingUrl="/api/v1/s3/sign"
            accept="image/*"
            preprocess={this.onUploadStart}
            onProgress={this.onUploadProgress}
            onError={this.onUploadError}
            onFinish={this.onUploadFinish}
            server="http://localhost:3000" />
        </NewArtForm>
      </Loader>
    )
  }
}

NewArtFormContainer.contextTypes = {
  router: React.PropTypes.object
}
  
const mapStateToProps = function (store) {
  return {art: store.artState.art}
}

export default connect(mapStateToProps)(NewArtFormContainer)