import * as api from '../utils/ajaxHelpers.js';
import {displayNotice} from './app.js';

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
  dispatch(startPostCategory());
  api.post('categories', {category: category}).then(response => {
    if (response.errors == null) {
      dispatch(categoryResponse(response));
      router.push('/categories')
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
      router.push(`/categories`)
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

export const deleteCategory = (categoryId, router) => (dispatch) => {
  dispatch(deleteCategoryStart());
  return api.destroy(`categories/${categoryId}`).then(response => {
    if (response.errors == null) {
      dispatch(categoryDeletedResponse(categoryId));
      router.push(`/categories`)
    } else {
      dispatch(deleteCategoryFailed(response.errors));
      dispatch(displayNotice(response.errors.join(", ")))
    }
  })
}


const deleteCategoryStart = () => ({
  type: "DELETE_CATEGORY"
});

const categoryDeletedResponse = (category_id) => ({
  type: "CATEGORY_DELETED",
  category_id
});

const deleteCategoryFailed = (errors) => ({
  type: "DELETE_CATEGORY_FAILED",
  errors
});