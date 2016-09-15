import React from 'react';
import VoteButton from './forms/vote_button.js';

const Art = (props) => {
  return (
    <div className='art'>
      <img src={props.image} />
      <h2>{props.name}</h2>
      <div className="art-description">{props.description}</div>
      {!props.no_voting && 
        <VoteButton selected={() => {props.selectWinner(props.id)}}/> }
    </div>
  )
}

Art.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.number,
  selectWinner: React.PropTypes.func,
  image: React.PropTypes.string.isRequired
}

Art.defaultProps = {
  image: 'http://placehold.it/250x250',
  description: "Description Would Go Here"
}



export default Art