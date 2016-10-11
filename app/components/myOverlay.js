import React from 'react'

const MyOverlay = ({show, close}) => {
  return <div onClick={close} style={{display: `${show != '' ? 'block' : 'none'}`}} className='authFormOverlay'></div>
}

export default MyOverlay