import * as api from '../utils/ajaxHelpers.js';

export const categoriesRequest = () => (dispatch) => {
  dispatch(requestCategories())
  api.getCategories().then(response => {
    if (response.errors == null) {
      dispatch(categoriesResponse(response))      
    } else {
      dispatch(categoriesResponseFailed(resposne))
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