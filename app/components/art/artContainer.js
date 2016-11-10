import React from 'react';
import {connect} from 'react-redux'
import ArtInfo from './artInfo.js';
import { Router, Route, Link, browserHistory } from 'react-router';
import {fetchArt} from '../../actions/art.js';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '10px auto 0 auto',
    padding: 10
  }
}


class ArtContainer extends React.Component{
  componentDidMount(){
    this.props.loadArt(this.props.params.id);
  }
  
  render(){
    return (
      <div style={styles.container} >
        <ArtInfo art={{...this.props.art, creation_date: this.props.art.creation_date.toString()}} />
        <Link to={`/art/${this.props.art.id}/edit`} >Edit </Link>
      </div>
    )
  }
}

ArtContainer.propTypes = {
  art: React.PropTypes.object.isRequired,
  loadArt: React.PropTypes.func.isRequired
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