import React from 'react'
import Radium from 'radium'
import {StyleRoot} from 'radium'
import FooterStyles from '../styles/footer.js'

const Footer = () => {
  return(
    <footer style={FooterStyles}> 
      <div style={FooterStyles.socialMedia}>
        <StyleRoot>
          <a style={[FooterStyles.link, FooterStyles.socialMediaLink]} href="https://twitter.com/artvsart_io" target="new">
            <img width='32' src='/public/twitter.png' />
          </a>
          <a style={[FooterStyles.link, FooterStyles.socialMediaLink]} href="https://github.com/benpolinsky/artvsart" target="new">
            <img width='32' src='/public/github.png' />
          </a>  
        </StyleRoot>
      </div>

      <h1>© {new Date().getFullYear()} <a style={FooterStyles.link} target="new" href='http://benpolinsky.com'>Ben Polinsky</a></h1>
    </footer>
  )
}

export default Radium(Footer)


