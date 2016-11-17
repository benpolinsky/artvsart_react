const initialArtState = {
  art: {
    name: "",
    creator: "",
    description: "",
    image: "",
    id: 0,
    category_name: "",
    category: {
      name: "",
      color: ""
    },
    creation_date: Date.now(),
    source: "",
    source_link: "",
    status: "pending_review"
  },
  allArt: [
    {
      name: "",
      creator: "",
      description: "",
      image: "",
      id: 0,
      category_name: "",
      category: {
        name: "",
        color: ""
      },
      creation_date: Date.now(),
      source: "",
      source_link: "",
      status: "pending_review"
    }
  ],
  pages: {
  
  },
  search: "",
  errors: {},
  fetching: false
}

const artReducer = (state=initialArtState, action) => {
  switch (action.type) {
  case "BEGIN_ART_REQUEST":
  case "DELETE_ART_REQUEST":
  case "ART_REQUESTED":
  case "ALL_ART_REQUESTED":
  case "CREATE_NEW_ART_REQUEST":
    return {...state, fetching: true}
  case "ALL_ART_RESPONSE":
    return {...state, allArt: action.allArt, pages: action.pages, search: (action.search ? action.search : ''), fetching: false}
  case "ALL_ART_REQUEST_FAILED":
    return {...state, errors: action.errors, fetching: false}
  case "ART_RESPONSE":
  case "ART_DELETED_RESPONSE":
    return {...state, art: action.art, fetching: false}
  case "ART_DELETED_FAILED":
  case "ART_REQUEST_FAILED":
    return {...state, errors: action.errors, fetching: false}
  case "RESET_ART": 
    return initialArtState
  case "CREATE_NEW_ART_RESPONSE":
    return {...state, art: action.art, fetching: false}
  case "CREATE_NEW_ART_REQUEST_FAILED":
    return {...state, errors: action.errors, fetching: false}
  case "UPDATE_ART_REQUEST":
    return {...state, art: {...state.art, creation_date: state.art.creation_date.toString()}, fetching: true}
  case "UPDATE_ART_RESPONSE":
    return {...state, art: {...state.art, creation_date: state.art.creation_date.toString()}, fetching: false}
  case "UPDATE_ART_REQUEST_FAILED":
    return {...state, errors: action.errors, fetching: false}
  }
  return state
}

export default artReducer