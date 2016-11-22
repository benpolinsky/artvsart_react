import React from 'react';
import {connect} from 'react-redux'
import ArtInfo from './artInfo.js';
import { Router, Route, Link, browserHistory } from 'react-router';
import {deleteArt, fetchArt} from '../../actions/art.js';
import InlineSeparator from '../elements/inlineSeparator.js';
import BaseStyles from '../../styles/base.js'

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '10px auto 0 auto',
    padding: 10
  }
}


class AdminArtContainer extends React.Component{
  componentDidMount(){
    this.props.loadArt(this.props.params.id);
  }
  
  render(){
    return (
      <div style={styles.container} >
        <ArtInfo art={{...this.props.art}} />
        <div>
          <Link style={BaseStyles.traditionalLink} to={`/art/${this.props.art.id}/edit`}>Edit</Link>
          <InlineSeparator />
          <Link to={`/art/${this.props.art.id}`} style={BaseStyles.traditionalLink} onClick={this.props.deleteArt.bind(this, this.props.art.id, this.context.router)} >Delete</Link>
        </div>

      </div>
    )
  }
}

AdminArtContainer.propTypes = {
  art: React.PropTypes.object.isRequired,
  loadArt: React.PropTypes.func.isRequired
}

AdminArtContainer.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (state) => ({
  art: state.artState.art
});

const mapDispatchToProps = (dispatch) => ({
  loadArt(id){
    dispatch(fetchArt(id));
  },
  deleteArt(id, router){
    dispatch(deleteArt(id, router))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminArtContainer)