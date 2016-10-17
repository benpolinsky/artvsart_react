import React from 'react'
import {connect} from 'react-redux'
import {Link, Router} from 'react-router'
import {categoriesRequest} from '../../actions/categories.js'
import Category from './category.js'

class CategoriesList extends React.Component{
  componentDidMount(){
    this.props.fetchCategories();
  }
  
  render(){
    return(
      <div className='centered-page'>
        <h1 className="mainTitle"> Categories </h1>
        <div>
          {this.props.categories.map(category => {
            return <Link key={category.id} to={`/categories/${category.id}`}><Category category={category} /></Link>
          })}
        </div>
      </div>
    )
  }
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