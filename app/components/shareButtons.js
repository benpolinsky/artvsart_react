import React from 'react';
import Radium from 'radium';
import {ShareButtons, ShareCounts, generateShareIcon} from 'react-share';

const {
  FacebookShareButton,
  TwitterShareButton,
} = ShareButtons;


const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

const MyShareButtons = ({shareTitle, styles}) => {
  console.log(styles)
  return (
    <div>
      <hr/>
      <div className='meme' style={styles}>
        <FacebookShareButton
          url={'http://artvsart.io'}
          title={shareTitle}
        >
          <FacebookIcon size={75} square />
        </FacebookShareButton>
      </div>
          
      <div style={styles}>
        <TwitterShareButton
        url='http://www.artvsart.io'
        title={shareTitle}
        className="Demo__some-network__share-button"
        >
          <TwitterIcon size={75} square />
        </TwitterShareButton>
       </div>
    </div>
  )
}

MyShareButtons.propTypes = {
  shareTitle: React.PropTypes.string.isRequired,
  styles: React.PropTypes.object
}

export default Radium(MyShareButtons)