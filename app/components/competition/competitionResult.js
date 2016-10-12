// So while this is okay, it would be great to try to rid myself of the competitionContainer and create it through connect()
// render the modal in here or in App.  Should work.


import React from 'react';
import Loader from 'react-loader-advanced';
import Art from '../art/art.js';
import ShareButtons from '../shareButtons.js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const spinnerStyles = {
  background: {
    backgroundColor: 'rgba(255,255,255.0.8)',
    position: 'fixed',
    left: '0',
    top: '0'
  }
}

export const CompetitionResult = ({competition, displayInfo}) => {
  const art_pair = [competition.art, competition.challenger];
  const winning_art = art_pair.find( (art) => art.id == competition.winner_id);
  const losing_art = art_pair.find( (art) => art.id != competition.winner_id);
  
  return (

    <div className='competition'>
      <Loader backgroundStyle={spinnerStyles.background} show={competition.isFetching}>
  
        <div className="artPair">
          <div className='art'>
            <Art selectInfo={displayInfo} key={winning_art.id} art={winning_art} noVoting={true} />
            <p className='percentages'>{competition.art_percentages.winner_winning_percentage}</p>
          </div>
  
          <div className='versusSeparator small'>Defeated</div>
  
          <div className='art'>
            <Art selectInfo={displayInfo} key={losing_art.id} art={losing_art} noVoting={true} />
            <p className='percentages'>{competition.art_percentages.loser_winning_percentage}</p>
          </div>
        </div>
  
        <div className='share-buttons'>
          <p>Share It!</p>
          <ShareButtons className="competition-share" share_title={competition.share_title}/>
        </div>
        
      </Loader>
    </div>
  )
}

CompetitionResult.contextTypes = {
  store: React.PropTypes.object
}
