import React from 'react';
import VoteButton from './vote_button.js';

const Art = (props) => {
  return (
    <div className='art'>
      <img src='http://placehold.it/250x250' />
      <h2>{props.name}</h2>
      <div className="art-description">{props.description}</div>
      <VoteButton selected={() => {props.selectWinner(props.id)}}/>
    </div>
  )
}

Art.propTypes = {
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  id: React.PropTypes.number,
  selectWinner: React.PropTypes.func.isRequired
}

export default Art