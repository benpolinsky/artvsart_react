import React from 'react';
import Art from '../art.js';
import { Router, Route, Link, browserHistory } from 'react-router';
import AjaxHelpers from '../../utils/ajax_helpers';


class ShowArt extends React.Component{
  constructor(){
    super();
  }
  
  componentWillMount(){
    this.state = {
      art: {
        id: 0,
        name: "",
        creator: "",
        description: ""
      }
    }
    AjaxHelpers.fetchArt(this.props.params.id).then(res => {
      this.setState({
        art: res.art
      })
    })
  }
  
  render(){
    console.log('rendering')
    console.log(this.state);
    return <Art key={this.state.art.id} 
         id={this.state.art.id} 
         name={this.state.art.name}
         description={this.state.art.description}
         no_voting={true}
          />
  }
}

export default ShowArt