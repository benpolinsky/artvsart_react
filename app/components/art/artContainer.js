import React from 'react';
import {connect} from 'react-redux'
import Art from './art.js';
import { Router, Route, Link, browserHistory } from 'react-router';
import {fetchArt} from '../../actions/art.js';


class ArtContainer extends React.Component{
  componentDidMount(){
    this.props.loadArt(this.props.params.id);
  }
  
  render(){
    return (
      <div className="centered-page">
        <Art key={this.props.art.id} art={this.props.art} noVoting={true} />
        <Link to={`/art/${this.props.art.id}/edit`} >Edit </Link>
      </div>
    )
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