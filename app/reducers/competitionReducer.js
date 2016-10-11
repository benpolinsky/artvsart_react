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
    winner_id: 2,
    share_title: "default share title",
    isFetching: true,
    winnerSelected: false,
    closeModal: true,
    isResult: false
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
         isFetching: false,
         closeModal: true,
         winnerSelected: false
       }
     }
 case "RECEIVE_FINISHED_COMPETITION":
   var winning_art_id = action.competition.winner_id;
   var art_pair = [action.competition.art, action.competition.challenger];
   var winning_art = art_pair.find( (art) => art.id == winning_art_id );
   var losing_art = art_pair.find( (art) => art.id != winning_art_id);
    return {
      ...state, 
      competition: {
        ...action.competition, 
        share_title: 'ite',
        isFetching: false,
        closeModal: true,
        winnerSelected: true,
        winning_art: winning_art,
        losing_art: losing_art,
        isResult: true
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
  case 'SELECT_COMPETITION_WINNER_FAILED':
    return {
      ...state, 
      competition: {
        ...state.competition,
        isFetching: false,
        errors: action.errors,
        closeModal: false
      }
    } 
  case "SELECT_COMPETITION_WINNER":
    var winning_art_id = action.winner_id;
    var art_pair = [state.competition.art, state.competition.challenger];
    var winning_art = art_pair.find( (art) => art.id == winning_art_id );
    var losing_art = art_pair.find( (art) => art.id != winning_art_id);
    
    return {
       ...state, 
       competition: {
         ...state.competition, 
         winning_art: winning_art, 
         losing_art: losing_art,
         share_title: `${winning_art.name} battled ${losing_art.name} AND WON! on artvsart`,
         winnerSelected: true,
         art_percentages: action.competition.art_percentages,
         isFetching: false,
         closeModal: false
       }
     }
  case "CLOSE_COMPETITION_MODAL":
    return {
      ...state, 
      competition: {
        ...state.competition,
        closeModal: true
      }
    } 
  }
  return state;
}

export default competitionReducer