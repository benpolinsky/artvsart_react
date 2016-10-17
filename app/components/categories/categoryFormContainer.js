import React from 'react'
import {connect} from 'react-redux'
import CategoryForm from './categoryForm.js'
import {Router} from 'react-router';
import {createCategory} from '../../actions/categories.js'

class CategoryFormContainer extends React.Component{
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(category){
    this.props.createCategory(category, this.context.router);      
  }
  
  render(){
    const {createCategory, category} = this.props;
    
    return (<CategoryForm 
            form="NewCategoryForm"
            formTitle="Create Category"
            submitLabel="Create"
            formAction={createCategory}
            category={category}
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFormContainer)