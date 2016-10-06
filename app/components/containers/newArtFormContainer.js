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
      loading: true,
      art: {
        name: "",
        creator: "",
        description: "",
        errors: {
          name: [],
          creator: [],
          description: []
        }
      }
    }
    this.toggleLoader(false);
  }
  componentDidMount(){
    this.setState({
      art: {
        name: "",
        creator: "",
        description: "",
        errors: { 
          name: [],
          creator: [],
          description: []
          
        }
      }
    })
  }
  
  createNewArt(e){
    e.preventDefault();
    const router = this.context.router
    this.validateForm() && this.props.createNewArt(this.state.art, router);
  }

  // It'd be nice to find a library
  // So many edge cases
  validateForm(){
    let errors = {
      name: [],
      creator: [],
      description: []
    }
    if (this.state.art.name.length < 2) {
      errors = {
        ...errors,
        name: ['please enter a minimum of 2 letters']
      }
    } 
    if (this.state.art.creator.length < 2) {
      errors = {
        ...errors,
        creator: ['please enter a minimum of 2 letters']
      }
    }
    if (this.state.art.description.length < 10) {
      errors = {
        ...errors,
        description: ['please enter a minimum of 10 letters']
      }
    }
    
    this.setState({
      ...this.state,
      art: {
        ...this.state.art,
        errors: errors
      }
    })
    const errorCount = Object.values(errors);
    return !errorCount.some((error) => { return error.length > 0})
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
    console.log(art);
    this.setState({
      art: {
        ...this.state.art,
        ...art
      }
    })
    console.log(this.state)
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
        <NewArtForm update={this.updateArtValues} errors={this.state.art.errors} submit={this.createNewArt} triggerLoader={this.toggleLoader}>
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