import React from 'react'
import Radium from 'radium'
import {StyleRoot} from 'radium'
import Styles from '../../styles/buttons.js'

const ArtButton = ({action, label, type='', disabled, size='default'}) => {
  return(
    <StyleRoot><button disabled={disabled} style={Styles[size]} onClick={action} type={type} >{label}</button></StyleRoot>
  )
}

export default Radium(ArtButton)