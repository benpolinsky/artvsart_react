import React from 'react';
import VoteButton from './forms/vote_button.js';

const Art = (props) => {
  return (
    <div className='art'>
      <img src='http://placehold.it/250x250' />
      <h2>{props.name}</h2>
      <div className="art-description">{props.description}</div>
      {!props.no_voting && 
        <VoteButton selected={() => {props.selectWinner(props.id)}}/> }
    </div>
  )
}

Art.propTypes = {
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  id: React.PropTypes.number,
  selectWinner: React.PropTypes.func
}

export default Art