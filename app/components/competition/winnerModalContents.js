import React from 'react';
import Radium from 'radium';
import ShareButtons from '../shareButtons.js';
import MainButton from '../elements/button.js'
import CompetitionStyles from '../../styles/competition.js';
import ConsensusMessage from '../../utils/consensusMessage.js'

const WinnerModalContents = ({competition, closeModal, nextCompetition}) => {
  const modalStyles = CompetitionStyles.modal
   
  const {winning_art, losing_art, art_percentages, shareTitle} = competition
  const winning_percentage = art_percentages.winner_winning_percentage;
  const win_float = parseFloat(winning_percentage.substr(0, winning_percentage.length - 1));
  

  return(
    <div style={modalStyles.contents}>
      
      <h2 style={modalStyles.winnerName}>{winning_art.name}</h2> 
      
      <h3 style={modalStyles.wins}>Wins!</h3>
      
      <p style={modalStyles.loser}>defeated <span>{losing_art.name}</span></p>
      
      <hr />
      
      <p style={modalStyles.consensus}>{ConsensusMessage(win_float)}</p>
  
      <MainButton kind='responsive' action={nextCompetition} label="Next Battle"/>

      <div style={modalStyles.shareButtons}>
        <span style={modalStyles.sharePrompt}>Share This Result!</span>
        <ShareButtons size={50}  shareTitle={shareTitle}/>
      </div>

    </div>
  )
}
const StyledModal = Radium(WinnerModalContents)
export default StyledModal