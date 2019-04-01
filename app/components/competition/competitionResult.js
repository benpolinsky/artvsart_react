// So while this is okay, it would be great to try to rid myself of the competitionContainer and create it through connect()
// render the modal in here or in App.  Should work.

import React from 'react';
import Radium from 'radium'
import {StyleRoot} from 'radium'
import Loader from 'react-loader-advanced';
import ArtInfo from '../art/artInfo.js';
import Art from '../art/art.js'
import ShareButtons from '../shareButtons.js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CompetitionStyles from '../../styles/competition.js'
const spinnerStyles = {
  background: {
    backgroundColor: 'rgba(255,255,255.0.8)',
    position: 'fixed',
    left: '0',
    top: '0'
  }
}

const CompetitionResult = ({competition, displayInfo}) => {
  const art_pair = [competition.art, competition.challenger];
  const winning_art = art_pair.find( (art) => art.id == competition.winner_id);
  const losing_art = art_pair.find( (art) => art.id != competition.winner_id);

  return (

    <div>
      <Loader backgroundStyle={spinnerStyles.background} show={competition.isFetching}>
      <StyleRoot>
        <div style={CompetitionStyles.artPair}>
          
          <Art styles={{...CompetitionStyles.art}} selectInfo={displayInfo} key={winning_art.id} art={winning_art} noVoting={true} />
  
          <div style={CompetitionStyles.versus}>Defeated</div>
  
          <Art styles={{...CompetitionStyles.art, ...CompetitionStyles.losingArt}} selectInfo={displayInfo} key={losing_art.id} art={losing_art} noVoting={true} />
        </div>
  
        <div style={CompetitionStyles.shareButtons}>
          <p style={CompetitionStyles.shareButtons.p}>Share It!</p>
          <ShareButtons 
            shareTitle={competition.shareTitle}
            shareLink={`https://artvsart.io/competition_result/${competition.id}`}
          />
        </div>
        </StyleRoot>
      </Loader>
    </div>
  )
}

CompetitionResult.propTypes = {
  competition: React.PropTypes.object.isRequired,
  displayInfo: React.PropTypes.func.isRequired
}

CompetitionResult.contextTypes = {
  store: React.PropTypes.object
}

export default Radium(CompetitionResult)