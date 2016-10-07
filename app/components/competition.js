// So while this is okay, it would be great to try to rid myself of the competitionContainer and create it through connect()
// render the modal in here or in App.  Should work.


import React from 'react';
import Loader from 'react-loader-advanced';
import Art from './art.js';
import ArtShareButtons from './ArtShareButtons.js';
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

export const Competition = ({competition, handleClose, displayInfo}) => {
  const actions = [
    <FlatButton primary={true} label={"Sign Up"} onTouchTap={handleClose}/>,
    <FlatButton label={"No Thanks..."} onTouchTap={handleClose} />
  ];

  return (
    <div className='competition'>
      <Loader backgroundStyle={spinnerStyles.background} show={competition.isFetching}>
  
        <div className="artPair">
          <div className='art'>
            <Art selectInfo={displayInfo} key={competition.art.id} art={competition.art} />
          </div>
  
          <div className='versusSeparator'>VS</div>
  
          <div className='art'>
            <Art selectInfo={displayInfo} key={competition.challenger.id} art={competition.challenger} />
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
          <ArtShareButtons className="competition-share" share_title={competition.share_title}/>
        </div>
        
      </Loader>
    </div>
  )
}

Competition.contextTypes = {
  store: React.PropTypes.object
}
