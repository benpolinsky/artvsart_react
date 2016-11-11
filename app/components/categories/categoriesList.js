import React from 'react'
import Radium from 'radium'
import {StyleRoot} from 'radium'
import {connect} from 'react-redux'
import {Link, Router} from 'react-router'
import {categoriesRequest} from '../../actions/categories.js'
import Category from './category.js'
import baseStyles from '../../styles/base.js'
import categoryStyles from '../../styles/categories.js'
import ArtButton from '../elements/button.js'
var RadiumLink = Radium(Link)

class CategoriesList extends React.Component{
  componentDidMount(){
    this.props.fetchCategories();
    this.gotoNewCategory = this.gotoNewCategory.bind(this);
  }
  
  gotoNewCategory(){
    this.context.router.push('categories/new')
  }
  
  render(){
    return(
      <div style={baseStyles.centeredPage}>
        <h1 style={baseStyles.mainTitle}> Categories </h1>
        <StyleRoot>
          <div>
            {this.props.categories.map(category => {
              return <RadiumLink style={categoryStyles.link} key={category.id} to={`/categories/${category.id}/edit`}><Category category={category} /></RadiumLink>
            })}
            <ArtButton action={this.gotoNewCategory} label="Add New Category"/>
          </div>
        </StyleRoot>
      </div>
    )
  }
}

CategoriesList.propTypes = {
  categories: React.PropTypes.array.isRequired,
  fetchCategories: React.PropTypes.func.isRequired
}

CategoriesList.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  categories: state.categories.records
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories(){
    dispatch(categoriesRequest());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Radium(CategoriesList))