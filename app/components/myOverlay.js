import React from 'react'
import Radium from 'radium'
import formStyles from '../styles/forms.js'

const MyOverlay = ({show, close}) => {
  return <div onClick={close} style={[{display: `${show != '' ? 'block' : 'none'}`}, formStyles.auth]}></div>
}

MyOverlay.propTypes = {
  show: React.PropTypes.string.isRequired,
  close: React.PropTypes.func.isRequired
}

export default Radium(MyOverlay)

