import React from 'react'

const UserGravatar = ({hash}) => <img style={{margin: '0px 10px 0px 0'}} src={`https://www.gravatar.com/avatar/${hash}`} />

UserGravatar.propTypes = {
  hash: React.PropTypes.string.isRequired
}

export default UserGravatar