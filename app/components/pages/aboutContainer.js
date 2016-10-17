// already a presentational component
import React from 'react';


export default class AboutContainer extends React.Component {
  constructor(){
    super();
  }
  
  render(){
    return (
      <div className="centered-page">
        <h1 className="mainTitle">About Art Vs Art</h1>
        <div className="aboutArtVsArt">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        </div>
      </div>
    )
  }
  
}
