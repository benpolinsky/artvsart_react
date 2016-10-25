import React from 'react'
import Radium from 'radium'

const Category = ({category, align, mergedStyles}) => {

  const color = category.color ?  category.color : 'black'
  const title = category.name ? category.name : 'Category'
  const alignment = {
    textAlign: align == 'left' ? 'left' : 'center',
    padding: align == 'left' ? '0px' : '8px 4px',
    margin: align == 'left' ? '0' : '0 auto'
  }
  const styles = {
    backgroundColor: color,
    color: 'white',
    display: 'block',
    boxSizing: 'border-box',
    padding: alignment.padding,
    lineHeight: 1,
    textAlign: alignment.textAlign,
    margin: alignment.margin
  }
  
  
  return(
   <span style={[styles, mergedStyles]}>{title}</span>
  )
}

export default Radium(Category)