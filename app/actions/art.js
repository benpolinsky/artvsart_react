import * as api from '../utils/ajaxHelpers.js'

export const fetchArt = (id) => (dispatch) => {
  dispatch(beginArtRequest());
  api.get(`art/${id}`).then(response => {
    if (response.errors == null) {
      dispatch(fetchArtResponse(response))
    } else {
      dispatch(fetchArtRequestFailed(response))
    }
  })
}

export const resetArt = () => ({
  type: "RESET_ART"
});

const beginArtRequest = () => ({
  type: "ART_REQUESTED"
});

const fetchArtResponse = (response) => ({
  type: "ART_RESPONSE",
  art: response.art
});

const fetchArtRequestFailed = (response) => ({
  type: "ART_REQUEST_FAILED",
  error: response.errors
});

export const createNewArt = (art, router) => (dispatch) => {
  dispatch(createNewArtRequest());
  api.post('art', {art: art}).then(response => {
    if (response.errors == null) {
      dispatch(createNewArtResponse(response));
      router.push(`/art/${response.art.id}`)
    } else {
      dispatch(createNewArtRequestFailed(response));
    }
  })
}


const createNewArtRequest = () => ({
  type: "CREATE_NEW_ART_REQUEST"
})

const createNewArtRequestFailed = (response) => ({
  type: "CREATE_NEW_ART_REQUEST_FAILED",
  errors: response.errors
})

const createNewArtResponse = (response) => ({
  type: "CREATE_NEW_ART_RESPONSE",
  art: response.art
})

export const updateArt = (art, router) => (dispatch) => {
  dispatch(updateArtRequest());
  api.put(`art/${art.id}`, {art: art}).then(response => {
    if (response.errors == null) {
      dispatch(updateArtResponse(response));
      router.push(`/art/${response.art.id}`)
    } else {
      dispatch(updateArtRequestFailed(response))
    }
  })
}

const updateArtRequest = () => ({
  type: "UPDATE_ART_REQUEST"
})

const updateArtRequestFailed = (response) => ({
  type: "UPDATE_ART_REQUEST_FAILED",
  errors: response.errors
})

const updateArtResponse = (response) => ({
  type: "UPDATE_ART_RESPONSE",
  art: response.art
})



export const storeSignedUrl = (signedUrl) => (dispatch) => ({
  type: "STORE_SIGNED_URL",
  url: signedUrl
})