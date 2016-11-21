import Immutable from 'immutable'

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
    status: "pending_review",
    previous: {
      id: 0,
      name: ''
    },
    next: {
      id: 0,
      name: ''
    }
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
  fetching: false,
  allChecked: false
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
    return {...state, allArt: action.allArt.map((a) => {a['checked'] = false; return a;}), pages: action.pages, search: (action.search ? action.search : ''), fetching: false}
  case "ALL_ART_REQUEST_FAILED":
    return {...state, errors: action.errors, fetching: false}
  case "ART_RESPONSE":
    // const currentArtIndex = state.allArt.findIndex((art) => art.id == action.art.id);
    // // we need to handle cases
    // const previousArt = state.allArt
    return {...state, art: action.art, fetching: false}
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
    return {...state, art: {...state.art, ...action.art, creation_date: state.art.creation_date.toString()}, fetching: false}
  case "UPDATE_ART_REQUEST_FAILED":
    return {...state, errors: action.errors, fetching: false}
  case "UPDATE_ART_STATUS_RESPONSE":
    var stateMap = Immutable.fromJS(state);
    var newState = stateMap.updateIn(['allArt'], (art) => {
      return art.map((a) => {
        if (a.get('id') == action.response.art.id) {
          return a.set('status', action.response.art.status)
        } else {
          return a
        }
      })
    });
    return {...newState.toJS(), fetching: false}
  case "TOGGLE_ALL_ART":
    return {...state, allChecked: !action.checked, allArt: state.allArt.map(a => {
      return ({...a, checked: !action.checked})
    })
  }
  case "TOGGLE_CHECKED_ART":

    var stateMap = Immutable.fromJS(state);
    var updatedStateMap = stateMap.updateIn(['allArt', action.artIndex, 'checked'], value => !value);
    return updatedStateMap.toJS();
    
  case "UPDATE_TOGGLED_SUCCESS":
  
    var stateMap = Immutable.fromJS(state);
    var newState = stateMap.updateIn(['allArt'], (art) => {
      return art.map((a) => {
        if (action.art.map(a => a.id).includes(a.get('id'))) {
          return a.set('status', action.status).set('checked', false)
        } else {
          return a
        }
      })
    });

    return {...newState.toJS(), fetching: false, allChecked: false};
  }
  return state
}

export default artReducer