import React from 'react';
import VoteButtonContainer from '../competition/VoteButton.js';
import { StyleSheet, css } from 'aphrodite';
import Category from '../categories/category.js'

const Art = ({art, noVoting, styles, selectInfo}) => {
  return (
    <div>
      <Category category={art.category} />
      <div className='imageContainer'>
        <img onClick={() => {selectInfo(art.id)}} src={art.image} />
      </div>
      <h3 onClick={() => {selectInfo(art.id)}}>{`${art.name} by ${art.creator}`}</h3>
      {!noVoting && 
        <VoteButtonContainer art_id={art.id} /> }
    </div>
  )
}

Art.propTypes = {
  art: React.PropTypes.object.isRequired,
  selectInfo: React.PropTypes.func,
  noVoting: React.PropTypes.bool
}

Art.defaultProps = {
  art: {
    id: 0,
    image: 'http://placehold.it/250x250',
    description: "Description Would Go Here"
  }

}



export default Art

// The idea of merging styles if you are going to use aphrodite: 

// const baseStyles = StyleSheet.create({
//
//   art: {
//     float: 'left',
//     width: '50%',
//     boxSizing: 'border-box',
//     padding: '30px'
//   },
//
//   artImage: {
//     width: '100%'
//   }
//
// })

// inside of Art:
// if (styles != null ) {
//   var injectedStyles = StyleSheet.create(styles);
// }
// const newStyles = {...baseStyles, ...injectedStyles};
