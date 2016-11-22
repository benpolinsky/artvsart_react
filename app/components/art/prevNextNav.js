import React from 'react';
import {Link} from 'react-router';
import inlineSeparator from '../elements/inlineSeparator.js';
import ArtNavStyles from '../../styles/artNav.js';

const PrevNextNav = ({art}) => {
  return (
    <div style={ArtNavStyles.container}>
      {art.previous && <Link style={ArtNavStyles.previousLink} to={`/art/${art.previous.id}/edit`}>{`«${art.previous.name}`}</Link>}
      <inlineSeparator />
      {art.next && <Link style={ArtNavStyles.nextLink} to={`/art/${art.next.id}/edit`}>{`${art.next.name}»`}</Link>}
    </div>
  );
}

export default PrevNextNav