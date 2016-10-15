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
  dispatch(startPostCategory());
  api.post('categories', category).then(response => {
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
  category: category.errors
});

