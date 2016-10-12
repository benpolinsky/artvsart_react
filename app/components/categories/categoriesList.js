import React from 'react'
import {connect} from 'react-redux'
import {categoriesRequest} from '../../actions/categories.js'

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
            return <p key={category.id}>{category.name}</p>
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