import React from 'react';
import Radium from 'radium';
import VoteButton from '../competition/VoteButton.js';
import Category from '../categories/category.js'
import InfoIcon from './infoIcon.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Art = ({art, noVoting, styles, selectInfo}) => {
  return (
    <div style={styles}>
      <Category category={art.category} align='left' mergedStyles={styles.category} />
      <div style={styles.imageContainer}>
        <img style={styles.image} onClick={() => {selectInfo(art.id)}} src={art.image} />

        <InfoIcon onClick={() => {selectInfo(art.id)}} styles={styles.infoIcon} />

      </div>
      <div onClick={() => {selectInfo(art.id)}}>
        <h3 style={styles.h3} >{art.name}</h3>
        <h3 style={styles.h3}>{`by ${art.creator}`}</h3>
      </div>
      
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
