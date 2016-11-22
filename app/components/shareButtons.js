import React from 'react';
import Radium from 'radium';
import {ShareButtons, ShareCounts, generateShareIcon} from 'react-share';


const {
  FacebookShareButton,
  TwitterShareButton,
} = ShareButtons;


const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');


const MyShareButtons = ({shareTitle, size=75, shareLink='http://www.artvsart.io'}) => {

  return (
    <div style={{display: 'flex'}}>
      <div style={{cursor: 'pointer'}}>
        <FacebookShareButton
          url={shareLink}
          title={shareTitle}
        >
          <FacebookIcon size={size} square />
        </FacebookShareButton>
      </div>
          
      <div style={{cursor: 'pointer'}}>
        <TwitterShareButton
        url={shareLink}
        title={shareTitle}
        className="Demo__some-network__share-button"
        >
          <TwitterIcon size={size} square />
        </TwitterShareButton>
       </div>
    </div>
  )
}

MyShareButtons.propTypes = {
  shareTitle: React.PropTypes.string.isRequired,
  shareLink: React.PropTypes.string,
  size: React.PropTypes.number,
  
}

export default Radium(MyShareButtons)