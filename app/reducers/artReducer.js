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
  errors: {}
}

const artReducer = (state=initialArtState, action) => {
  switch (action.type) {
  case "ALL_ART_REQUESTED":
    return state
  case "ALL_ART_RESPONSE":
    return {...state, allArt: action.allArt}
  case "ALL_ART_REQUEST_FAILED":
    return {...state, errors: action.errors}
  case "ART_REQUESTED":
    return state
  case "ART_RESPONSE":
    return {...state, art: action.art}
  case "ART_REQUEST_FAILED":
    return {...state, errors: action.errors}
  case "RESET_ART": 
    return initialArtState
  case "CREATE_NEW_ART_REQUEST":
    return state
  case "CREATE_NEW_ART_RESPONSE":
    return {...state, art: action.art}
  case "CREATE_NEW_ART_REQUEST_FAILED":
    return {...state, errors: action.errors}
  case "UPDATE_ART_REQUEST":
    return {...state, art: {...state.art, creation_date: state.art.creation_date.toString()}}
  case "UPDATE_ART_RESPONSE":
    return {...state, art: {...state.art, creation_date: state.art.creation_date.toString()}}
  case "UPDATE_ART_REQUEST_FAILED":
    return {...state, errors: action.errors}
  }
  return state
}

export default artReducer