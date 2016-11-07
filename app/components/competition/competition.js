// So while this is okay, it would be great to try to rid myself of the competitionContainer and create it through connect()
// render the modal in here or in App.  Should work.

import React from 'react';
import Radium from 'radium'
import {StyleRoot} from 'radium'
import Loader from 'react-loader-advanced';
import Art from '../art/art.js';
import ShareButtons from '../shareButtons.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress'
import loaderStyles from '../../styles/loader.js'
import CompetitionStyles from '../../styles/competition.js'

const Competition = ({competition, displayInfo, noVoting, artStyle}) => {  
  const circularLoader = <MuiThemeProvider><CircularProgress /></MuiThemeProvider>
  return (
      <div>
        <Loader foregroundStyle={loaderStyles.foreground} backgroundStyle={loaderStyles.background} message={circularLoader} show={competition.isFetching && !competition.closeModal}>

          <StyleRoot>
            <div style={CompetitionStyles.artPair}>
              <Art styles={{...CompetitionStyles.art, ...artStyle}} selectInfo={displayInfo} key={competition.art.id} art={competition.art} noVoting={noVoting} />
              <Art styles={{...CompetitionStyles.art, ...artStyle}} selectInfo={displayInfo} key={competition.challenger.id} art={competition.challenger} noVoting={noVoting} />
            </div>
          </StyleRoot>        
    
          <div style={CompetitionStyles.shareButtons}>
            <p style={CompetitionStyles.shareButtons.p}>Share It!</p>
            <ShareButtons className="competition-share" shareTitle={competition.shareTitle}/>
          </div>
        </Loader>
      </div>
  )
}

Competition.propTypes = {
  competition: React.PropTypes.object.isRequired,
  displayInfo: React.PropTypes.func.isRequired,
  noVoting: React.PropTypes.bool
}

Competition.contextTypes = {
  store: React.PropTypes.object
}

export default Radium(Competition) 