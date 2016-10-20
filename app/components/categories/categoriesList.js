import React from 'react'
import {connect} from 'react-redux'
import {Link, Router} from 'react-router'
import {categoriesRequest} from '../../actions/categories.js'
import Category from './category.js'
import baseStyles from '../../styles/base.js'

class CategoriesList extends React.Component{
  componentDidMount(){
    this.props.fetchCategories();
  }
  
  render(){
    return(
      <div style={baseStyles.centeredPage}>
        <h1 style={baseStyles.mainTitle}> Categories </h1>
        <div>
          {this.props.categories.map(category => {
            return <Link key={category.id} to={`/categories/${category.id}`}><Category category={category} /></Link>
          })}
        </div>
      </div>
    )
  }
}

CategoriesList.propTypes = {
  categories: React.PropTypes.array.isRequired,
  fetchCategories: React.PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  categories: state.categories.records
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories(){
    dispatch(categoriesRequest());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList)