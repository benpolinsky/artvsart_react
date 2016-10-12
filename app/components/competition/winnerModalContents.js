import React from 'react';
import ShareButtons from '../shareButtons.js';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



export const WinnerModalContents = ({competition, closeModal}) => {

  const {winning_art, losing_art, art_percentages, share_title} = competition
  const winning_percentage = art_percentages.winner_winning_percentage;
  const win_float = parseFloat(winning_percentage.substr(0, winning_percentage.length - 1));
  var consensus_message = ""
  
  if (win_float >= 80.0) {
    consensus_message = "Nearly all people voting agree with you.";
  } else if (80.0 > win_float >= 55.0 ) {
    consensus_message = "Most people voting agree with you.";    
  } else if (55.0 > win_float >= 45.0 ) {
    consensus_message = "About half the people voting agree with you.";    
  } else if (45.0 > win_float >= 25.0 ) {
    consensus_message = "You're in the minority, here.  Most people disagree with your vote!";    
  } else if (25.0 > win_float >= 0.0 ) {
    consensus_message = "Next to nobody agrees with you... bwah...";    
  } else {
    consensus_message = "Thanks for playing!";
  }

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
          ({art_percentages.winner_winning_percentage})
        </span>  
        defeated

        <span className="loser-name">
          {losing_art.name} 
        </span> 

        <span className='loser-creator'>
          {losing_art.creator} 
          ({art_percentages.loser_winning_percentage})
        </span>
      </h3>
      <h3>{consensus_message}</h3>
      <span className='share-prompt'>Share This Result!</span>
 
      <div className='share-buttons'>
          <ShareButtons className='competition-winner-share' share_title={share_title}/>
      </div>

    </div>
  )
}

