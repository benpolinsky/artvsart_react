import React from 'react'

const UserGravatar = ({hash, size='80', onClick, styles={}}) => {
  return <img onClick={onClick} height={size} width={size} style={{margin: '0px 10px 0px 0', ...styles}} src={`https://www.gravatar.com/avatar/${hash}?s=${size}`} />
}

UserGravatar.propTypes = {
  hash: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
  size: React.PropTypes.string
}

export default UserGravatar