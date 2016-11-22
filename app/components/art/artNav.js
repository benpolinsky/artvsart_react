import React from 'react';
import {Link} from 'react-router';
import InlineSeparator from '../elements/inlineSeparator.js'
import BaseStyles from '../../styles/base.js'

const ArtNav = ({art}) => {
  return (
    <div style={BaseStyles.center}>
      <Link style={BaseStyles.traditionalLink} to='/art'>All Art</Link>
      <InlineSeparator />
      <Link style={BaseStyles.traditionalLink} to={`/art/${art.id}` }>Show {art.name}</Link>
    </div>
  )
}

export default ArtNav;