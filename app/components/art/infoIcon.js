import React from 'react'
import Radium from 'radium'

const infoIcon = ({styles, onClick}) => {
  return(
    <icon onClick={onClick} style={styles}>
      <img width={50} src='/info.svg' />
    </icon>
  )
}
export default Radium(infoIcon)