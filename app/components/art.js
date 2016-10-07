import React from 'react';
import VoteButtonContainer from './forms/VoteButton.js';
import { StyleSheet, css } from 'aphrodite';
import { Scrollbars } from 'react-custom-scrollbars';


const Art = ({art, noVoting, styles, selectInfo}) => {

  return (
    <div>
        <img onClick={() => {selectInfo(art.id)}} src={art.image} />
        <h3 onClick={() => {selectInfo(art.id)}}>{art.name}</h3>

        <div className="artDescription">
         <Scrollbars style={{ width: 500, height: 100 }}>
          {art.description}
         </Scrollbars>
        </div>
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
