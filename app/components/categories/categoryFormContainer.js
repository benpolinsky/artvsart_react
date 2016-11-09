import React from 'react'
import {connect} from 'react-redux'
import CategoryForm from './categoryForm.js'
import {Router} from 'react-router';
import {createCategory, categoriesRequest} from '../../actions/categories.js'
import DefaultLoader from '../defaultLoader.js';

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
    const {createCategory, category, categories, fetching} = this.props;


    return (
      <DefaultLoader showing={fetching}>
        <CategoryForm 
          form="NewCategoryForm"
          formTitle="Create Category"
          submitLabel="Create"
          formAction={createCategory}
          category={category}
          categories={categories}
          onSubmit={this.handleSubmit}
         />
      </DefaultLoader>
    )
  }
} 


CategoryFormContainer.contextTypes = {
  router: React.PropTypes.object
}
  

const mapStateToProps = (store) => ({
  category: store.categories.category,
  categories: store.categories.records,
  fetching: store.categories.isFetching
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