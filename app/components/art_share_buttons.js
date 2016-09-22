import React from 'react';
import {ShareButtons, ShareCounts, generateShareIcon} from 'react-share';

const {
  FacebookShareButton,
  TwitterShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

const ArtShareButtons = ({share_title}) => {
  return (
    <div>
    <FacebookShareButton
      url={'http://artvsart.com'}
      title={share_title}
      className="Demo__some-network__share-button">
      <FacebookIcon size={32} round />
    </FacebookShareButton>

     <TwitterShareButton
       url='http://www.artvsart.com'
       title={share_title}
       className="Demo__some-network__share-button">
       <TwitterIcon size={32} round />
     </TwitterShareButton>
    </div>
  )
}

export default ArtShareButtons