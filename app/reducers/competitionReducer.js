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
    share_title: "default share title",
    isFetching: true,
    winnerSelected: false
  }
}

const competitionReducer = (state=initialCompetitionState, action) => {
  switch (action.type) {
  case "REQUEST_COMPETITION":
    return {
      ...state, 
      competition: {
        ...state.competition, 
        share_title: 'ite',
        isFetching: true
      }
    }    
  case "RECEIVE_COMPETITION":
     return {
       ...state, 
       competition: {
         ...action.competition, 
         share_title: 'ite',
         isFetching: false
       }
     }
  case "SELECT_COMPETITION_WINNER":
    const winning_art_id = action.winner_id;
    const art_pair = [state.competition.art, state.competition.challenger];
    const winning_art = art_pair.find( (art) => art.id == winning_art_id );
    const losing_art = art_pair.find( (art) => art.id != winning_art_id);
    
    return {
       ...state, 
       competition: {
         ...state.competition, 
         winning_art: winning_art, 
         losing_art: losing_art,
         share_title: `${winning_art.name} battled ${losing_art.name} AND WON! on artvsart`,
         winnerSelected: true,
         art_percentages: action.competition.art_percentages,
         isFetching: false
       }
     }
   case 'START_SELECT_COMPETITION_WINNER':
   return {
     ...state, 
     competition: {
       ...state.competition,
       isFetching: true
     }
   } 
  }
  return state;
}

export default competitionReducer