// So while this is okay, it would be great to try to rid myself of the competitionContainer and create it through connect()
// render the modal in here or in App.  Should work.


import React from 'react';
import Loader from 'react-loader-advanced';
import Art from './art.js';
import ArtShareButtons from './art_share_buttons.js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const spinner = <span className="fa fa-spinner fa-spin"></span>;
const spinnerStyles = {
  foreground: {
    color: 'black',
    fontSize: '100px',
    height: '200px'
  },
  background: {
    backgroundColor: 'rgba(10,10,10,0.5)',
    position: 'fixed',
    left: '0',
    top: '0'
  }
}

export const Competition = ({competition, handleClose}) => {
  const actions = [
    <FlatButton primary={true} label={"Sign Up"} onTouchTap={handleClose}/>,
    <FlatButton label={"No Thanks..."} onTouchTap={handleClose} />
  ];
  return (
    <div className='competition'>
      <Loader 
        foregroundStyle={spinnerStyles.foreground} 
        backgroundStyle={spinnerStyles.background} 
        show={competition.isFetching} message={spinner}  >
        <Art key={competition.art.id} art={competition.art} />
        <Art key={competition.challenger.id} art={competition.challenger} />
        {competition.errors &&
          <div className='quick-errors'>
            <MuiThemeProvider>
              <Dialog open={!competition.closeModal} actions={actions} title="YUU">{competition.errors}</Dialog>
            </MuiThemeProvider>
        
          </div>
        }
        
        <div className='share-buttons'>
          <p>Share This Battle!</p>
          <ArtShareButtons className="competition-share" share_title={competition.share_title}/>
        </div>
      </Loader>
    </div>
  )
}

Competition.contextTypes = {
  store: React.PropTypes.object
}
