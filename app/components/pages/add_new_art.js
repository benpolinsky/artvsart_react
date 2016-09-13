import React from 'react';
import {Router} from 'react-router';
import Loader from 'react-loader-advanced';
import NewArtForm from '../forms/new_art_form.js';
import AjaxHelpers from '../../utils/ajax_helpers.js';

class AddNewArt extends React.Component {
  constructor(){
    super();
    this.createNewArt = this.createNewArt.bind(this);
    this.toggleLoader = this.toggleLoader.bind(this);
  }

  componentWillMount(){
    this.props = {
      art: {
        name: "",
        creator: "",
        description: "",
        image: ""
      }
    }
    this.toggleLoader(false);
  }
  
  createNewArt(new_art){
    this.toggleLoader(true);
    AjaxHelpers.createNewArt(new_art).then((response) => {
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
  
  render(){
    return (
      <Loader show={this.state.loading} message={'loading'} foregroundStyle={{color: 'white'}} backgroundStyle={{backgroundColor: 'black'}} >
        <NewArtForm submit={this.createNewArt} art={this.props.art} triggerLoader={this.toggleLoader}/>
      </Loader>
    )
  }
}
AddNewArt.contextTypes = {
  router: React.PropTypes.object
}
  

export default AddNewArt