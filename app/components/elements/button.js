import React from 'react'
import Radium from 'radium'
import {StyleRoot} from 'radium'
import Styles from '../../styles/buttons.js'

const ArtButton = ({action, label, type='', disabled, kind='default', styles={}}) => {
  return(
    <StyleRoot>
      <button disabled={disabled} style={{...Styles[kind], ...styles}} onClick={action} kind={kind} >{label}</button>
    </StyleRoot>
  )
}

export default Radium(ArtButton)