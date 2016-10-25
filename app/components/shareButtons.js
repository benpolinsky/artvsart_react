import React from 'react';
import Radium from 'radium';
import {ShareButtons, ShareCounts, generateShareIcon} from 'react-share';
import Styles from '../styles/buttons.js';

const {
  FacebookShareButton,
  TwitterShareButton,
} = ShareButtons;


const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const buttonStyles = Styles.main;

const MyShareButtons = ({shareTitle, size}) => {
  const buttonSize = size ? size : 75;
    
  return (
    <div style={{display: 'flex'}}>
      <div style={buttonStyles}>
        <FacebookShareButton
          url={'http://artvsart.io'}
          title={shareTitle}
        >
          <FacebookIcon size={buttonSize} square />
        </FacebookShareButton>
      </div>
          
      <div style={buttonStyles}>
        <TwitterShareButton
        url='http://www.artvsart.io'
        title={shareTitle}
        className="Demo__some-network__share-button"
        >
          <TwitterIcon size={buttonSize} square />
        </TwitterShareButton>
       </div>
    </div>
  )
}

MyShareButtons.propTypes = {
  shareTitle: React.PropTypes.string.isRequired
}

export default Radium(MyShareButtons)