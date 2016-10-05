import React from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';
import Loader from 'react-loader-advanced';
import ReactS3Uploader from 'react-s3-uploader';
import NewArtForm from '../forms/NewArtForm.js';
import {createNewArt} from '../../actions/art.js';
import * as storage from '../../localStorage.js';

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
  componentDidMount(){
    this.setState({
      art: {
        name: "",
        creator: "",
        description: ""
      }
    })
  }
  
  createNewArt(e){
    e.preventDefault();
    const router = this.context.router
    this.props.createNewArt(this.state.art, router);
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
      const old_art = this.state.art;
      this.setState({
        art: {
          ...old_art, 
          image: signed_url
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
            signingUrlHeaders={storage.tokenObject()}
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
});

const mapDispatchToProps = (dispatch) => ({
  createNewArt(art, router){
    dispatch(createNewArt(art, router));
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(NewArtFormContainer)