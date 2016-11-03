// For Categories, I've wrapped each action (edit, new) in a separate container.
// This is different than the single container approach I took with the ArtForm.
// I'm not a fan of all the conditionals in the ArtFormContainer, 
// so probably better to have multiple smaller components.


import React from 'react'
import {connect} from 'react-redux'
import CategoryForm from './categoryForm.js'
import {Router} from 'react-router';
import {updateCategory, requestCategory, categoriesRequest} from '../../actions/categories.js'

class EditCategoryFormContainer extends React.Component{
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.loadCategory(this.props.params.id);
    this.props.fetchCategories()
  }
  
  handleSubmit(category){
    this.props.updateCategory(category, this.context.router);
  }
  
  render(){
    const {category, updateCategory, categories} = this.props;
    
    return (<CategoryForm 
            initialValues={category}
            enableReinitialize
            form="EditCategoryForm"
            formTitle={`Edit ${category.name}`}
            submitLabel="Update"
            formAction={updateCategory}
            categories={categories}
            onSubmit={this.handleSubmit}
           />)
  }
} 


EditCategoryFormContainer.contextTypes = {
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
  loadCategory(id){
    dispatch(requestCategory(id))
  },
  updateCategory(data, router){
    dispatch(updateCategory(data, router));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryFormContainer)