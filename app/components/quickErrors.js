import React from 'react'
import Radium from 'radium'
import alerts from '../styles/alerts.js'

const QuickError = ({children}) => {
  return(
    <div style={alerts}>
      {children}
    </div>
  )
}

export default Radium(QuickError)