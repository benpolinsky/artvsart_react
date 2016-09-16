import React from 'react';
import VoteButton from './forms/vote_button.js';

const Art = (props) => {
  return (
    <div className='art'>
      <img src={props.art.image} />
      <h2>{props.art.name}</h2>
      <div className="art-description">{props.art.description}</div>
      <p className='win-loss-record'>Record: {props.art.win_loss_record}</p>
      {!props.no_voting && 
        <VoteButton selected={() => {props.selectWinner(props.art.id)}}/> }
    </div>
  )
}

// Art.propTypes = {
//   name: React.PropTypes.string.isRequired,
//   id: React.PropTypes.number,
//   selectWinner: React.PropTypes.func,
//   image: React.PropTypes.string.isRequired
// }

Art.defaultProps = {
  art: {
    id: 0,
    image: 'http://placehold.it/250x250',
    description: "Description Would Go Here"
  }

}



export default Art