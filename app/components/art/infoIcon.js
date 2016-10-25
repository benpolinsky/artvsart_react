import React from 'react'
import Radium from 'radium'

const infoIcon = ({styles, onClick}) => {
  return(
    <icon onTouchTap={onClick} style={styles}>
      <img width={50} src='../../../public/info.svg' />
    </icon>
  )
}
export default Radium(infoIcon)