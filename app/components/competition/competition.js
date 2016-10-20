// So while this is okay, it would be great to try to rid myself of the competitionContainer and create it through connect()
// render the modal in here or in App.  Should work.

import React from 'react';
import Radium from 'radium'
import {StyleRoot} from 'radium'
import Loader from 'react-loader-advanced';
import Art from '../art/art.js';
import ShareButtons from '../shareButtons.js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress'
import loaderStyles from '../../styles/loader.js'
import CompetitionStyles from '../../styles/competition.js'

const RawCompetition = ({competition, handleClose, displayInfo, noVoting}) => {
  const actions = [
    <FlatButton primary={true} label={"Sign Up"} onTouchTap={handleClose}/>,
    <FlatButton label={"No Thanks..."} onTouchTap={handleClose} />
  ];
  
  const circularLoader = <MuiThemeProvider><CircularProgress /></MuiThemeProvider>

  return (
    
      <div>
        <Loader foregroundStyle={loaderStyles.foreground} backgroundStyle={loaderStyles.background} message={circularLoader} show={competition.isFetching && !competition.closeModal}>
          <StyleRoot>
            <div style={CompetitionStyles.artPair}>
              <Art styles={CompetitionStyles.art} selectInfo={displayInfo} key={competition.art.id} art={competition.art} noVoting={noVoting} />
              <div style={CompetitionStyles.versus}>VS</div>
              <Art styles={CompetitionStyles.art} selectInfo={displayInfo} key={competition.challenger.id} art={competition.challenger} noVoting={noVoting} />
            </div>
          </StyleRoot>
        

          {competition.errors &&
            <div className='quick-errors'>
              <MuiThemeProvider>
                <Dialog open={!competition.closeModal} actions={actions} title="Oh No!">{competition.errors.base}</Dialog>
              </MuiThemeProvider>
            </div>
          }
        
          <div style={CompetitionStyles.shareButtons}>
            <p style={CompetitionStyles.shareButtons.p}>Share It!</p>
            <ShareButtons styles={CompetitionStyles.shareButtons.button} className="competition-share" shareTitle={competition.shareTitle}/>
          </div>
        
        </Loader>
      </div>

  )
}

RawCompetition.propTypes = {
  competition: React.PropTypes.object.isRequired,
  handleClose: React.PropTypes.func.isRequired,
  displayInfo: React.PropTypes.func.isRequired,
  noVoting: React.PropTypes.bool
}

RawCompetition.contextTypes = {
  store: React.PropTypes.object
}

export default Radium(RawCompetition) 