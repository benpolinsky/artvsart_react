import React from 'react';
import {Router} from 'react-router';
import ArtForm from './art_form.js';
import AjaxHelpers from '../utils/ajax_helpers.js';

class AddNewArt extends React.Component {
  constructor(){
    super();
    this.createNewArt = this.createNewArt.bind(this);

  }

  componentWillMount(){
    this.props = {
      art: {
        name: "",
        creator: "",
        description: ""
      }
    }
  }
  
  createNewArt(new_art){
    AjaxHelpers.createNewArt(new_art).then((response) => {this.handleResponse(response)})
  }
  
  handleResponse(response){
    this.context.router.push(`/art/${response.art.id}`)
  }
  
  render(){
    return (
      <div className='AddNewArt'>
        <ArtForm submit={this.createNewArt} art={this.props.art} />
      </div>
    )
  }
}
AddNewArt.contextTypes = {
  router: React.PropTypes.object
}
  

export default AddNewArt