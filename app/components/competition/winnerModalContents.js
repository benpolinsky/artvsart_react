import React from 'react';
import Radium from 'radium';
import ShareButtons from '../shareButtons.js';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CompetitionStyles from '../../styles/competition.js';


const WinnerModalContents = ({competition, closeModal}) => {
  const modalStyles = CompetitionStyles.modal
   
  const {winning_art, losing_art, art_percentages, shareTitle} = competition
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
    <div style={modalStyles.contents}>
      <h2>Winner!</h2>
      <h3> 
        <span style={[modalStyles.winnerName, modalStyles.winnerInfo]}>
          {winning_art.name} 
        </span> 
        by
        <span style={modalStyles.winnerInfo}> 
          {winning_art.creator}
          ({art_percentages.winner_winning_percentage})
        </span>  
        defeated

        <span style={modalStyles.winnerInfo}>
          {losing_art.name} 
        </span> 

        <span style={modalStyles.winnerInfo}>
          {losing_art.creator} 
          ({art_percentages.loser_winning_percentage})
        </span>
      </h3>
      <h3>{consensus_message}</h3>
      <span style={modalStyles.sharePrompt}>Share This Result!</span>
 
      <div style={modalStyles.shareButtons}>
          <ShareButtons styles={CompetitionStyles.shareButtons} shareTitle={shareTitle}/>
      </div>

    </div>
  )
}
const StyledModal = Radium(WinnerModalContents)
export default StyledModal