import React from 'react'
import {connect} from 'react-redux'

const Category = ({category}) => {
  return(
    <div>
      {category.name}
      {category.color}
    </div>
  )
}

const mapStateToProps = (store) => ({
  category: store.categories.category 
});

export default connect(mapStateToProps)(Category);