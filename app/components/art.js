import React from 'react';
import VoteButton from './forms/vote_button.js';

const Art = ({art, no_voting, selectWinner}) => {
  return (
    <div className='art'>
      <img src={art.image} />
      <h2>{art.name}</h2>
      <div className="art-description">{art.description}</div>
      <p className='win-loss-record'>Record: {art.win_loss_record}</p>
      {!no_voting && 
        <VoteButton selected={() => {selectWinner(art.id)}}/> }
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