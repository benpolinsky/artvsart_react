import React from 'react'

const Category = ({category}) => {

  const color = category.color ?  category.color : 'black'
  const title = category.name ? category.name : 'Category'
  const styles = {
    backgroundColor: color,
    color: 'white',
    width: 100,
    display: 'block',
    boxSizing: 'borderBox',
    padding: 4,
    lineHeight: 1,
    textAlign: 'center',
    margin: '0 auto'
  }
  return(
   <span style={styles}>{title}</span>
  )
}

export default Category