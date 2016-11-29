import React from 'react';
import Radium from 'radium';
import baseStyles from '../../styles/base.js';
import CompetitionContainer from '../competition/competitionContainer.js';

const artStyles = {
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    overflow: 'hidden',
    position: 'relative'
  }
}


class HomePage extends React.Component{
  render(){
    return(
      <div style={baseStyles.centeredPage}>
        <div>
          <h1 style={baseStyles.mainTitle}>Welcome to Art Vs Art</h1>
          <p style={baseStyles.homeParagraph}>Pit the world's most famous works of visual, musical, and printed art against each other in the ultimate battle royale.</p>
          <p style={[baseStyles.homeParagraph, {fontWeight: 700}]}>Like this one: </p>
          <br/>
        </div>
        <CompetitionContainer artStyles={artStyles} example={true} />
      </div>
    )
  }
}

export default Radium(HomePage)