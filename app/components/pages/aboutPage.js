// already a presentational component
import React from 'react';
import baseStyles from '../../styles/base.js';

export default class AboutPage extends React.Component {
  constructor(){
    super();
  }
  
  render(){
    return (
      <div style={baseStyles.centeredPage}>
        <h1 style={baseStyles.mainTitle}>About Art Vs Art</h1>
        <div style={{maxWidth: 500}}>
          <h1>Every piece of art thinks it is the best.  We all know it.</h1>
          <p>Well, now it's finally time back up all that smack talk.</p>
          <p>Think the episode of Seinfeld where Jerry shamelessly admits changing the size-tags on all of his jeans is more perfect piece of craftmanship than the Sistine Chapel?</p>  
          <h2>Here's your chance to voice your opinion.</h2>
        </div>
      </div>
    )
  }
  
}
