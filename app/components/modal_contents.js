import React from 'react';
import ArtShareButtons from './art_share_buttons.js';

export const ModalContents = ({winning_art, losing_art, percentages, share_title, closeModal}) => {
  return(
    <div className='modal-contents'>
      <h2>Winner!</h2>
      <h3 className="winner-info"> 
        <span className="winner-name">
          {winning_art.name} 
        </span> 
        by
        <span className="winner-creator"> 
          {winning_art.creator}
          ({percentages.winner_winning_percentage})
        </span>  
        against

        <span className="loser-name">
          {losing_art.name} 
        </span> 

        <span className='loser-creator'>
          {losing_art.creator} 
          ({percentages.loser_winning_percentage}))
        </span>
      </h3>
          
      <span className='share-prompt'>Share This Result!</span>
 
      <div className='share-buttons'>
          <ArtShareButtons className='competition-winner-share' share_title={share_title}/>
      </div>

      <button className="btn close-modal-btn btn-lg btn-primary" 
          onClick={closeModal}> Next Battle!
      </button>
    </div>
  )
}

