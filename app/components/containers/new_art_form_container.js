// essentially the NewArtFormContainer
import React from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';
import Loader from 'react-loader-advanced';
import ReactS3Uploader from 'react-s3-uploader';
import NewArtForm from '../forms/new_art_form.js';
import {createNewArt} from '../../utils/ajax_helpers.js';


class NewArtFormContainer extends React.Component {
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
    // we'll need to deal with this in the store
    e.preventDefault();
    this.toggleLoader(true);
    createNewArt(this.state.art).then((response) => {
      this.toggleLoader(false);
      return (this.handleResponse(response));
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
    // let's keep this in local state.
    // and we'll dispatch in CreateNewArt above.
    this.setState({
      art: art
    })
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
          url: signed_url
        }
      })
    }); 
  }
  
  render(){
    return (
      <Loader show={this.state.loading} message={'loading'} foregroundStyle={{color: 'white'}} backgroundStyle={{backgroundColor: 'black'}} >
        <NewArtForm update={this.updateArtValues} submit={this.createNewArt} triggerLoader={this.toggleLoader}>
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
  router: React.PropTypes.object,
  store: React.PropTypes.object
}
  
const mapStateToProps = (store) => ({
  art: store.artState.art
})

export default connect(mapStateToProps)(NewArtFormContainer)