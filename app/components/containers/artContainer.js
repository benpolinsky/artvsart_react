import React from 'react';
import {connect} from 'react-redux'
import Art from '../art.js';
import { Router, Route, Link, browserHistory } from 'react-router';
import {fetchArt} from '../../actions/art.js';


class ArtContainer extends React.Component{
  componentDidMount(){
    console.log('mounting');
    this.props.loadArt(this.props.params.id);
  }
  
  render(){
    return <Art key={this.props.art.id} art={this.props.art} no_voting={true} />
  }
}

const mapStateToProps = (state) => ({
  art: state.artState.art
});

const mapDispatchToProps = (dispatch) => ({
  loadArt(id){
    dispatch(fetchArt(id));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtContainer)