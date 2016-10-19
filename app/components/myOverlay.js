import React from 'react'

const MyOverlay = ({show, close}) => {
  return <div onClick={close} style={{display: `${show != '' ? 'block' : 'none'}`}} className='authFormOverlay'></div>
}

MyOverlay.propTypes = {
  show: React.PropTypes.string.isRequired,
  close: React.PropTypes.func.isRequired
}

export default MyOverlay

