import React from 'react';


const VoteButton = ({selected}) => {
  return <a className="btn btn-primary vote-btn" href='#' onClick={selected}>Vote</a>
}

VoteButton.propTypes = {
  selected: React.PropTypes.func.isRequired
}

export default VoteButton