// already a presentational component
import React from 'react';
import baseStyles from '../../styles/base.js';

export default class AboutPage extends React.Component {
  constructor(){
    super();
  }
  
  render(){
    const pageStyles = baseStyles.paddedContainer(25);
    
    return (
      <div style={baseStyles.centeredPage}>
        <h1 style={baseStyles.mainTitle}>About This</h1>
        <div style={pageStyles}>
          <h1 style={pageStyles.item}>Art Vs Art will decide the universe's greatest piece of art.</h1>
          <p style={pageStyles.item}>Crowdbuzzing.  Data mine-inpulation.  Embracitude.  </p>
          <p style={pageStyles.item}>Yeah, I guess you could say we're algorithim chasers.</p>
          <p style={pageStyles.item}>Think the episode of Seinfeld where Jerry shamelessly admits changing the size-tags on all of his jeans is more perfect piece of craftmanship than the Sistine Chapel?</p>  
          <h2 style={pageStyles.item}>Here's your chance to voice your opinion.</h2>
        </div>
      </div>
    )
  }
  
}
