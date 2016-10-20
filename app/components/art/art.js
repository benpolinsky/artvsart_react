import React from 'react';
import Radium from 'radium';
import VoteButton from '../competition/VoteButton.js';
import Category from '../categories/category.js'

const Art = ({art, noVoting, styles, selectInfo}) => {
  return (
    <div style={styles}>
      <Category category={art.category} />
      <div style={styles.imageContainer}>
        <img style={styles.image} onClick={() => {selectInfo(art.id)}} src={art.image} />
      </div>
      <h3 style={styles.h3} onClick={() => {selectInfo(art.id)}}>{`${art.name} by ${art.creator}`}</h3>
      {!noVoting && 
        <VoteButton styles={styles.voteButton} art_id={art.id} /> }
    </div>
  )
}

Art.propTypes = {
  art: React.PropTypes.object.isRequired,
  selectInfo: React.PropTypes.func,
  noVoting: React.PropTypes.bool,
  styles: React.PropTypes.object
}

Art.defaultProps = {
  art: {
    id: 0,
    image: 'http://placehold.it/250x250',
    description: "Description Would Go Here"
  }

}

export default Radium(Art)
