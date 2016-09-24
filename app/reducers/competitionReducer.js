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
  case "SELECT_COMPETITION_WINNER":
    const winning_art_id = action.winner_id;
    const art_pair = [state.competition.art, state.competition.challenger];
    const winning_art = art_pair.find( (art) => art.id == winning_art_id );
    const losing_art = art_pair.find( (art) => art.id != winning_art_id);
    const newState = {
       ...state, 
       competition: {
         ...state.competition, 
         winning_art: winning_art, 
         losing_art: losing_art
       }
     }
      console.log(newState)
     return newState
  }
  return state;
}

export default competitionReducer