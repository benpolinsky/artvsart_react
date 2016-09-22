// essentially the NewArtFormContainer
import React from 'react';
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
      art: {
        name: "",
        creator: "",
        description: "",
        image: ""
      },
      loading: true
    }
    this.toggleLoader(false);
  }
  
  createNewArt(e){
    e.preventDefault();
    this.toggleLoader(true);
    AjaxHelpers.createNewArt(this.state.art).then((response) => {
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
    this.setState({
      art: {
       ...this.state.art,
       name: art.name,
       creator: art.creator,
       description: art.description
      }
    })
  }
  
  onUploadStart(file, next){
    this.toggleLoader(true);
    next(file);
  }


  onUploadFinish(file){
    this.toggleLoader(false, () => {
      const signed_url = file.signedUrl.split('?X-Amz-Expires')[0];      
      this.setState({
        art: {...this.state.art, image: signed_url}
      });
    }); 
  }
  
  render(){
    return (
      <Loader show={this.state.loading} message={'loading'} foregroundStyle={{color: 'white'}} backgroundStyle={{backgroundColor: 'black'}} >
        <NewArtForm update={this.updateArtValues} submit={this.createNewArt} art={this.state.art} triggerLoader={this.toggleLoader}>
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
  
