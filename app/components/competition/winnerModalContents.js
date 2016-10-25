import React from 'react';
import Radium from 'radium';
import ShareButtons from '../shareButtons.js';
import MainButton from '../elements/mainButton.js'
import CompetitionStyles from '../../styles/competition.js';


const WinnerModalContents = ({competition, closeModal, nextCompetition}) => {
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
      
      <h2 style={modalStyles.winnerName}>{winning_art.name}</h2> 
      
      <h3 style={modalStyles.wins}>Wins!</h3>
      
      <p style={modalStyles.loser}>defeated <span style={{fontWeight: 600}}>{losing_art.name}</span></p>
      
      <hr />
      
      <p style={modalStyles.consensus}>{consensus_message}</p>
  
      <MainButton action={nextCompetition} label="Next Battle"/>

      <div style={modalStyles.shareButtons}>
        <span style={modalStyles.sharePrompt}>Share This Result!</span>
        <ShareButtons size={50} styles={CompetitionStyles.shareButtons} shareTitle={shareTitle}/>
      </div>

    </div>
  )
}
const StyledModal = Radium(WinnerModalContents)
export default StyledModal