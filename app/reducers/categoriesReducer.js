const defaultCategoriesState = {
  records: [{id: 0, name: "Category Name", color: 'black'}],
  category: {id: null, name: "", color: ''},
  errors: null
};

const CategoriesReducer = (state=defaultCategoriesState, action) => {
  switch (action.type) {
  case "CATEGORIES_REQUEST":
    return state
  case "CATEGORIES_RESPONSE":
    return {
      ...state,
      records: action.response.categories
    }
  case "CATEGORIES_RESPONSE_FAILED":
    return {
      ...state,
      errors: action.errors
    }
  }
  return state
}

export default CategoriesReducer