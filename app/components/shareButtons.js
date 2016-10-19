import React from 'react';
import {ShareButtons, ShareCounts, generateShareIcon} from 'react-share';

const {
  FacebookShareButton,
  TwitterShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

const MyShareButtons = ({shareTitle}) => {
  return (
    <div>
    <hr/>
    <FacebookShareButton
      url={'http://artvsart.com'}
      title={shareTitle}
      className="Demo__some-network__share-button">
      <FacebookIcon size={75} square />
    </FacebookShareButton>

     <TwitterShareButton
       url='http://www.artvsart.com'
       title={shareTitle}
       className="Demo__some-network__share-button">
       <TwitterIcon size={75} square />
     </TwitterShareButton>
    </div>
  )
}

MyShareButtons.propTypes = {
  shareTitle: React.PropTypes.string.isRequired
}

export default MyShareButtons