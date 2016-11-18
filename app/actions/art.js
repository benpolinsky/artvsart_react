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



export const updateArtStatus = (id, status) => (dispatch) => {
  dispatch(updateArtRequest());
  api.put(`art/${id}/update_status`, {status: status}).then(response => {
    if (response.errors == null) {
      dispatch(updateArtResponse(response));
    } else {
      dispatch(updateArtRequestFailed(response))
    }
  })
}


export const deleteArt = (id, router) => (dispatch) => {
  dispatch(deleteArtRequest());
  api.destroy(`art/${id}`).then(response => {
    if (response.errors == null) {
      dispatch(artDeletedResponse(response));
      router.push('/art')
    } else {
      dispatch(artDeletedFailed(response))
    }
  })
}

const deleteArtRequest = () => ({
  type: "DELETE_ART_REQUEST"
})

const artDeletedFailed = (response) => ({
  type: "ART_DELETED_FAILED",
  errors: response.errors
})

const artDeletedResponse = (response) => ({
  type: "ART_DELETED_RESPONSE",
  art: response.art
})



export const fetchArtCollection = (page=null, search=null) => (dispatch) => {
  const params = api.toParams({page: page, search: search});
  dispatch(allArtRequested());

  api.get(`art?${params}`).then(response => {
    if (response.errors == null) {
      dispatch(allArtResponse(response));
    } else {
      dispatch(allArtRequestFailed(response.errors));
    }
  })
}

const allArtRequested = () => ({
  type: "ALL_ART_REQUESTED"
});

const allArtResponse = (response) => ({
  type: "ALL_ART_RESPONSE",
  allArt: response.art,
  pages: response.pages,
  search: response.search
});

const allArtRequestFailed = (response) => ({
  type: "ALL_ART_REQUEST_FAILED",
  errors: errors
});

export const storeSignedUrl = (signedUrl) => (dispatch) => ({
  type: "STORE_SIGNED_URL",
  url: signedUrl
})

export const toggleCheckedArt = (id, index) => ({
  type: "TOGGLE_CHECKED_ART",
  artId: id,
  artIndex: index
});

export const toggleAllArt = (checked) => ({
  type: "TOGGLE_ALL_ART",
  checked
});

export const updateToggledArt = (art_ids, status) => (dispatch) => {
  dispatch(updateArtRequest());
  api.put(`art/toggle_many`, {art_ids, status: status}).then(response => {
    if (response.errors == null) {
      dispatch(updateToggledSuccess(response, status));
    } else {
      dispatch(updatedToggledFailed(response.errors));
    }
  })
}

const updateToggledSuccess = (response, status) => ({
  type: "UPDATE_TOGGLED_SUCCESS",
  art: response.art,
  status: status
});

const updateToggledFailed = (errors) => ({
  type: "UPDATE_TOGGLED_FAILED",
  errors: errors

});
