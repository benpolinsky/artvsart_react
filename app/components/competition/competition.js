// So while this is okay, it would be great to try to rid myself of the competitionContainer and create it through connect()
// render the modal in here or in App.  Should work.

import React from 'react';
import Loader from 'react-loader-advanced';
import Art from '../art/art.js';
import ShareButtons from '../shareButtons.js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress'

const loaderStyles = {
  background: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    position: 'fixed',
    left: '0',
    top: '0',
    zIndex: 9999
  },
  foreground: {
    height: 50
  }
}

export const Competition = ({competition, handleClose, displayInfo, noVoting}) => {
  const actions = [
    <FlatButton primary={true} label={"Sign Up"} onTouchTap={handleClose}/>,
    <FlatButton label={"No Thanks..."} onTouchTap={handleClose} />
  ];
  
  const circularLoader = <MuiThemeProvider><CircularProgress /></MuiThemeProvider>

  return (
    <div className='competition'>
      <Loader foregroundStyle={loaderStyles.foreground} backgroundStyle={loaderStyles.background} message={circularLoader} show={competition.isFetching && !competition.closeModal}>
  
        <div className="artPair">
          <div className='art'>
            <Art selectInfo={displayInfo} key={competition.art.id} art={competition.art} noVoting={noVoting} />
          </div>
  
          <div className='versusSeparator'>VS</div>
  
          <div className='art'>
            <Art selectInfo={displayInfo} key={competition.challenger.id} art={competition.challenger} noVoting={noVoting} />
          </div>
        </div>
        

        
        {competition.errors &&
          <div className='quick-errors'>
            <MuiThemeProvider>
              <Dialog open={!competition.closeModal} actions={actions} title="Oh No!">{competition.errors.base}</Dialog>
            </MuiThemeProvider>
          </div>
        }
        
        <div className='share-buttons'>
          <p>Share It!</p>
          <ShareButtons className="competition-share" shareTitle={competition.shareTitle}/>
        </div>
        
      </Loader>
    </div>
  )
}

Competition.propTypes = {
  competition: React.PropTypes.object.isRequired,
  handleClose: React.PropTypes.func.isRequired,
  displayInfo: React.PropTypes.func.isRequired,
  noVoting: React.PropTypes.bool.isRequired
}

Competition.contextTypes = {
  store: React.PropTypes.object
}
