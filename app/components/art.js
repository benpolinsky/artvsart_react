import React from 'react';
import VoteButtonContainer from './forms/VoteButton.js';
import { StyleSheet, css } from 'aphrodite';

const baseStyles = StyleSheet.create({
  
  art: {
    float: 'left',
    width: '50%',
    boxSizing: 'border-box',
    padding: '30px' 
  },
  
  artImage: {
    width: '100%'
  }
  
})

const Art = ({art, no_voting, styles}) => {
  if (styles != null ) {
    var injectedStyles = StyleSheet.create(styles);    
  } 
  const newStyles = {...baseStyles, ...injectedStyles};

  return (
    <div className={css(newStyles.art)}>
      <img className={css(newStyles.artImage)} src={art.image} />
      <h3>{art.name}</h3>
      <div className="art-description">{art.description}</div>
      <p className='win-loss-record'>Record: {art.win_loss_record}</p>
      {!no_voting && 
        <VoteButtonContainer art_id={art.id} /> }
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