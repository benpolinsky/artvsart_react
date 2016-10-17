import React from 'react'

const Category = ({category}) => {

  const color = category.color ?  category.color : 'black'
  const title = category.name ? category.name : 'Category'
  const styles = {
    color: color,
    width: 100,
    display: 'block',
    boxSizing: 'borderBox',
    padding: '8px 4px',
    lineHeight: 1,
    textAlign: 'center',
    margin: '0 auto',
    fontFamily: 'Dancing Script'
  }
  return(
   <span style={styles}>{title}</span>
  )
}

export default Category