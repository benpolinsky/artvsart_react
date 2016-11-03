import * as api from '../utils/ajaxHelpers.js';

export const categoriesRequest = () => (dispatch) => {
  dispatch(requestCategories())
  api.get('categories').then(response => {
    if (response.errors == null) {
      dispatch(categoriesResponse(response))      
    } else {
      dispatch(categoriesResponseFailed(response))
    }
  });
}

const requestCategories = () => ({
  type: "CATEGORIES_REQUEST"
})

const categoriesResponse = (response) => ({
  type: "CATEGORIES_RESPONSE",
  response: response
})

const categoriesResponseFailed = (response) => ({
  type: "CATEGORIES_RESPONSE_FAILED",
  errors: response.errors
})

export const createCategory = (category, router) => (dispatch) => {
  console.log(category);
  dispatch(startPostCategory());
  api.post('categories', {category: category}).then(response => {
    if (response.errors == null) {
      dispatch(categoryResponse(response));
      router.push(`/categories/${response.category.id}`)
    } else {
      dispatch(categoryPostFailed(response));
    }
  })
}

const startPostCategory = () => ({
  type: "START_POST_CATEGORY"
});

const categoryResponse = (category) => ({
  type: "CATEGORY_RESPONSE",
  category: category
});

const categoryPostFailed = (category) => ({
  type: "CATEGORY_POST_FAILED",
  errors: category.errors
});

export const requestCategory = (id) => (dispatch, getState) => {
  if (getState().categories.category.id == id) {
    return false
  }
  dispatch(requestCategoryStart());
  return api.get(`categories/${id}`).then(response => {
    if (response.errors == null) {
      dispatch(categoryResponse(response));
    } else {
      dispatch(requestCategoryFailed(response));
    }
  })
}

const requestCategoryStart = () => ({
  type: "REQUEST_CATEGORY"
})

const requestCategoryFailed = (response) => ({
  type: "REQUEST_CATEGORY_FAILED",
  response: response
})


export const updateCategory = (category, router) => (dispatch) => {
  dispatch(updateCategoryStart());
  return api.put(`categories/${category.id}`, {category: category}).then(response => {
    if (response.errors == null) {
      dispatch(categoryResponse(response));
      router.push(`/categories/${response.category.id}`)
    } else {
      dispatch(updateCategoryFailed(response));
    }
  })
}

const updateCategoryStart = () => ({
  type: "UPDATE_CATEGORY"
})

const updateCategoryFailed = (response) => ({
  type: "UPDATE_CATEGORY_FAILED",
  response: response.errors
});