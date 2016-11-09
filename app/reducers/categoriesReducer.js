const defaultCategoriesState = {
  records: [{id: 0, name: "Category Name", color: 'black'}],
  category: {id: null, name: "", color: ''},
  errors: null,
  isFetching: false
};

const CategoriesReducer = (state=defaultCategoriesState, action) => {
  switch (action.type) {
  case "CATEGORIES_REQUEST":
    return {...state, isFetching: true}
  case "START_POST_CATEGORY":
    return {...state, isFetching: true}
  case "CATEGORIES_RESPONSE":
    return {
      ...state,
      records: action.response.categories,
      isFetching: false
    }
  case "CATEGORY_RESPONSE": 
    return {
      ...state,
      category: action.category.category,
      isFetching: false
    }
  case "CATEGORIES_RESPONSE_FAILED":
    return {
      ...state,
      errors: action.errors,
      isFetching: false
    }
  case "CATEGORY_POST_FAILED": 
    return {
      ...state,
      errors: action.errors,
      isFetching: false
    }
  case "REQUEST_CATEGORY": 
    return {
      ...state, 
      isFetching: true
    }
  case "REQUEST_CATEGORY_FAILED": 
    return {
      ...state, 
      isFetching: false
    }
  case "UPDATE_CATEGORY":
    return {
      ...state,
      isFetching: true
    }
  case "UPDATE_CATEGORY_FAILED":
    return {
      ...state,
      errors: action.errors,
      isFetching: false
    }
  }
  return state
}

export default CategoriesReducer