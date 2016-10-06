import React from 'react';
import VoteButtonContainer from './forms/VoteButton.js';
import { StyleSheet, css } from 'aphrodite';


const Art = ({art, no_voting, styles}) => {

  return (
    <div>
      <img src={art.image} />
      <h3>{art.name}</h3>
      <div className="art-description">{art.description}</div>
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
