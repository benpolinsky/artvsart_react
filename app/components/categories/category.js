import React from 'react'

const Category = ({category, align}) => {

  const color = category.color ?  category.color : 'black'
  const title = category.name ? category.name : 'Category'
  const alignment = {
    textAlign: align == 'left' ? 'left' : 'center',
    padding: align == 'left' ? '0px' : '8px 4px',
    margin: align == 'left' ? '0' : '0 auto'
  }
  const styles = {
    color: color,
    width: 100,
    display: 'block',
    boxSizing: 'border-box',
    padding: alignment.padding,
    lineHeight: 1,
    textAlign: alignment.textAlign,
    margin: alignment.margin,
    fontFamily: 'Dancing Script'
  }
  return(
   <span style={styles}>{title}</span>
  )
}

export default Category