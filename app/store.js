import {createStore, combineReducers} from 'redux';

const initialCompetitionState = {
  competition: {
    id: 0,
    art: {
      id: 1, 
      name: "Rakim's Paid in Full", 
      description: "The god Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      image: 'http://placehold.it/250x250'
    },
    challenger: {
      id: 2, 
      name: "Michaelangelo's David", 
      description: "A Legendary Sculpture",
      image: 'http://placehold.it/250x250'
    },
    winning_art: {
      id: 2, 
      name: "Michaelangelo's David", 
      description: "A Legendary Sculpture",
      image: 'http://placehold.it/250x250'
    },
    losing_art: {
      id: 2, 
      name: "Michaelangelo's David", 
      description: "A Legendary Sculpture",
      image: 'http://placehold.it/250x250'
    },
    share_title: ""
  }
}


const competitionReducer = (state=initialCompetitionState, action) => {
  switch (action.type) {
  case "STAGE_COMPETITION":
     return {...state, competition: action.competition}
  case "COMPETITION_RESULTS":
     return {...state, competition: {...state.competition, winning_art: action.competition.winning_art, losing_art: action.competition.losing_art}}
  }
  return state;
}

const artReducer = (state={}, action) => {
  return state
}

const reducers = combineReducers({
  competitionState: competitionReducer,
  artState: artReducer
})

let store = createStore(reducers);

export default store

