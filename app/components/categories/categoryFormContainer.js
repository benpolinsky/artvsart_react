import React from 'react'
import {connect} from 'react-redux'
import CategoryForm from './categoryForm.js'
import {Router} from 'react-router';
import {createCategory, categoriesRequest} from '../../actions/categories.js'

class CategoryFormContainer extends React.Component{
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentWillMount(){
    this.props.fetchCategories()
  }
  
  handleSubmit(category){
    this.props.createCategory(category, this.context.router);      
  }
  
  render(){
    const {createCategory, category, categories} = this.props;


    return (<CategoryForm 
            form="NewCategoryForm"
            formTitle="Create Category"
            submitLabel="Create"
            formAction={createCategory}
            category={category}
            categories={categories}
            onSubmit={this.handleSubmit}
           />)
  }
} 


CategoryFormContainer.contextTypes = {
  router: React.PropTypes.object
}
  

const mapStateToProps = (store) => ({
  category: store.categories.category,
  categories: store.categories.records
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories(){
    dispatch(categoriesRequest())
  },
  createCategory(data, router){
    dispatch(createCategory(data, router));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFormContainer)