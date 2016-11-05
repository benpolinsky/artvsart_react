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
        <h2 style={baseStyles.mainTitle}>About Art Vs Art</h2>
        <div style={pageStyles}>
          <h2 style={baseStyles.subheader}>One Art, Please!</h2>
          <p style={baseStyles.paragraph}>Just a little project to discover the world's ultimate piece of art!
          </p>
    
          <p style={baseStyles.paragraph}>
            The site ranks art using the ELO algorithm (no, not Electric Light Orchestra), 
            which takes into consideration the relative strength of each competitor during a given matchup.  
            It's been battle tested for decades by Chess tournaments, League of Legends, and supposedly the Facebook movie which I still have not seen.
          </p>
          
          <br/>
          <h2 style={baseStyles.subheader}>Built By Me</h2>
          <p style={baseStyles.paragraph}>
            Hello.  I'm Ben Polinsky.  I develop websites and make music.  Yep, that's about it.<br/>
            Interested in the code?  Check it out here and here.  This project is built on React and Ruby on Rails and utilizes many
            external APIs to pull in art in an efficient manner.  
          </p>
    
          <br/>
          <h2 style={baseStyles.subheader}>Suggest a Piece of Art</h2>
          <p style={baseStyles.paragraph}>
            I've tried to only select art with relatively high notoriety.  While it might be fun for you to see how your band's demo stacks up
            to The Scream (you lose, badly, by the way), no one else cares.  Trust me.  It's why I haven't added my own music.  Even though it's most certianly much better
            than yours.
          </p>
          <p style={baseStyles.paragraph}>Anyway, to suggest I add a piece of art, or any other Art Vs Art inquiries, you can email <a href='mailto:artvsartcontact@gmail.com'>artvsartcontact@gmail.com</a>.</p>
          <p style={baseStyles.paragraph}>All other correspondence can be sent to <a href="mailto:benjamin.polinsky@gmail.com">benjamin.polinsky@gmail.com.</a></p>
            
        </div>
      </div>
    )
  }
  
}
