import React from 'react'
import {connect} from 'react-redux'
import CategoryForm from './categoryForm.js'

class CategoryFormContainer extends React.Component{
  handleSubmit(values){
    console.log(values);
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


const mapStateToProps = (store) => ({
  category: store.categories.category
})

const mapDispatchToProps = (dispatch) => ({
  createCategory(data){
    dispatch(createCategory(data));
  },
  updateCategory(data){
    dispatch(updateCategory(data));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFormContainer)