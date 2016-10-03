import React from 'react'
import {connect} from 'react-redux'
import {selectCompetitionWinner} from '../../actions/index.js'

const VoteButton = ({onClick}) => {
  return <a className="btn btn-primary vote-btn" href='#' onClick={onClick}>Vote</a>
}


const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick(e){
    e.preventDefault();
    dispatch(selectCompetitionWinner(ownProps.art_id));
  }
})

VoteButton.propTypes = {
  onClick: React.PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(VoteButton)