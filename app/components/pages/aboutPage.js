import React from 'react';
import baseStyles from '../../styles/base.js';
import Radium, {StyleRoot} from 'radium';

class AboutPage extends React.Component {
  constructor(){
    super();
  }
  
  render(){
    const pageStyles = baseStyles.paddedContainer(25);
    
    return (
      <StyleRoot>
      <div style={baseStyles.contentPage}>
        <h2 style={{...baseStyles.mainTitle, textAlign: 'left', marginLeft: 30}}>About Art Vs Art</h2>
        <div style={pageStyles}>
          <h2 style={baseStyles.subheader}>One Art, Please!</h2>
          <p style={baseStyles.paragraph}>
            Just a little project to discover the world's ultimate piece of art!
          </p>
    
          <p style={baseStyles.paragraph}>
            The site ranks art using the ELO algorithm (no, not Electric Light Orchestra), 
            which takes into consideration the relative strength of each competitor during 
            a given matchup.  
            It's been battle tested for decades by Chess tournaments, League of Legends, 
            and supposedly popularized by the Facebook movie.
          </p>
          <br/>
          <h2 style={baseStyles.subheader}>Built By Me</h2>
    
          <p style={baseStyles.paragraph}>
            Hello.  I'm Ben Polinsky.
            <span> </span>
            <a href='https://benpolinsky.com' target='new'>I develop websites</a> and make music.  
            Yep, that's about it.<br/>
            Interested in the code?  Check it out
            <span> </span> 
            <a href='https://github.com/benpolinsky/artvsart' target='new'>here</a> and
            <span> </span> 
            <a href='https://github.com/benpolinsky/artvsart_react'>here</a>.  
            This project is built on <a href='https://facebook.github.io/react'>React</a> and 
            <span> </span> 
            <a target='new' href='https://rubyonrails.org'>Ruby on Rails</a>
            <span> </span>
            <a target='new' href='https://api.discogs.com'>and</a>   
            <span> </span>
            <a target='new' href='https://www.omdbapi.com/'>a</a>   
            <span> </span>
            <a target='new' href='https://developers.artsy.net/'>bunch</a> 
            <span> </span>
            <a target='new' href='https://developers.google.com/books/'>of</a>
            <span> </span>
            <a target='new' href='https://github.com/harvardartmuseums/'>APIs</a>.
          </p>
  
          <br/>
    
          <h2 style={baseStyles.subheader}>Suggest a Piece of Art</h2>
          <p style={baseStyles.paragraph}>
            I've tried to only select art with relatively high notoriety.  
            While it might be fun for you to see how your band's demo stacks up,
            we're not getting into that whole bag of shenanigans.    
          </p>
          <p style={baseStyles.paragraph}>Anyway, to suggest a piece of art to be added, or if you've got any other Art Vs Art inquiries, you can email <a href='mailto:artvsartcontact@gmail.com'>artvsartcontact@gmail.com</a>.</p>
          <p style={baseStyles.paragraph}>All other correspondence can be sent to <a href="mailto:benjamin.polinsky@gmail.com">benjamin.polinsky@gmail.com.</a></p>
            
        </div>
      </div>
     </StyleRoot>
    )
  }
  
}
export default Radium(AboutPage)