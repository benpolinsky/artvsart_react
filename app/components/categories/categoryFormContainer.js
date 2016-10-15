import React from 'react'
import {connect} from 'react-redux'
import CategoryForm from './categoryForm.js'
import {Router} from 'react-router';
import {createCategory, updateCategory} from '../../actions/categories.js'

class CategoryFormContainer extends React.Component{
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(category){
    if (this.props.location.pathname == "/categories/new") {
      this.props.createCategory(category, this.context.router);      
    } else {
      this.props.updateCategory(category, this.context.router);
    }

  }
  
  render(){
    const {params, createCategory, updateCategory} = this.props
    return (<CategoryForm 
            formType="register" 
            form="NewCategoryForm" 
            formTitle="Create Category"
            submitLabel="Create"
            formAction={createCategory}
            onSubmit={this.handleSubmit} 
           />)
  }
} 


CategoryFormContainer.contextTypes = {
  router: React.PropTypes.object
}
  

const mapStateToProps = (store) => ({
  category: store.categories.category
})

const mapDispatchToProps = (dispatch) => ({
  createCategory(data, router){
    dispatch(createCategory(data, router));
  },
  updateCategory(data, router){
    dispatch(updateCategory(data, router));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFormContainer)