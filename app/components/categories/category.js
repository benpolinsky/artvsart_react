import React from 'react'

const Category = ({category}) => {
  return(
   <h1 className='main-title' style={{color: category.color}}>{category.name}</h1>
  )
}

export default Category