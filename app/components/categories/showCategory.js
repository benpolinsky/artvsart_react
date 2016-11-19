import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {requestCategory, deleteCategory} from '../../actions/categories.js'
import Category from './category.js'
import baseStyles from '../../styles/base.js';

class ShowCategory extends React.Component{
  componentDidMount(){
    this.props.fetchCategory(this.props.params.id);
  }
  
  render(){
    const category = this.props.category;
    
    return(
      <div style={baseStyles.centeredPage}>
        <Category category={category} />
        <Link to={`/categories/${category.id}/edit`}>Edit</Link>
      </div>
    )
  }
  
}

const mapStateToProps = (store) => ({
  category: store.categories.category 
});

const mapDispatchToProps = (dispatch) => ({
  deleteCategory(id){
    deleteCategory(id)
  },
  fetchCategory(id){
    dispatch(requestCategory(id));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowCategory);