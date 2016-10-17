import React from 'react';
import {connect} from 'react-redux'
import ArtInfo from './artInfo.js';
import { Router, Route, Link, browserHistory } from 'react-router';
import {fetchArt} from '../../actions/art.js';


class ArtContainer extends React.Component{
  
  componentWillMount(){
    console.log(this.props.art)
  }
  componentDidMount(){
    this.props.loadArt(this.props.params.id);
  }
  
  render(){
    return (
      <div className="centered-page">
        <ArtInfo art={{...this.props.art, creation_date: this.props.art.creation_date.toString()}} />
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