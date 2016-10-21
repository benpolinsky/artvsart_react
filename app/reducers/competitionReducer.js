const initialCompetitionState = {
  competition: {
    id: 0,
    art: {
      id: 1, 
      name: "Rakim's Paid in Full", 
      description: "The god Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      image: 'http://placehold.it/250x250',
      category: {
        name: "",
        color: ""
      }
    },
    challenger: {
      id: 2, 
      name: "Michaelangelo's David", 
      description: "A Legendary Sculpture",
      image: 'http://placehold.it/250x250',
      category: {
        name: "",
        color: ""
      }
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
    shareTitle: "Visit Art Vs Art to Battle Any Art Vs Any Art",
    isFetching: true,
    winnerSelected: false,
    closeModal: true,
    isResult: false,
    art_percentages: {},
    errors: null
  }
}

const competitionReducer = (state=initialCompetitionState, action) => {
  switch (action.type) {
  case "REQUEST_COMPETITION":
    return {
      ...state, 
      competition: {
        ...action.competition,
        ...state.competition, 
        closeModal: false,
        winnerSelected: false,
        isResult: false
      }
    }    
  case "RECEIVE_COMPETITION":
     return {
       ...state, 
       competition: {
         ...state.competition,
         ...action.competition, 
         shareTitle: `Now Battling: ${action.competition.art.name} vs. ${action.competition.challenger.name} on Art Vs Art`,
         isFetching: false,
         winnerSelected: false,
         closeModal: true,
         isResult: false,
         errors: null
       }
     }
 case "RECEIVE_FINISHED_COMPETITION":
   var winning_art = winnerAndLoser(action.competition, action.competition.winner_id).winner;
   var losing_art = winnerAndLoser(action.competition, action.winner_id).loser;
    return {
      ...state, 
      competition: {
        ...state.competition,
        ...action.competition, 
         shareTitle: `${winning_art.name} battled ${losing_art.name} AND WON! on Art Vs. Art`,
        isFetching: false,
        closeModal: true,
        winnerSelected: true,
        winning_art: winning_art,
        losing_art: losing_art,
        isResult: true,
        errors: null
      }
    }
  case 'START_SELECT_COMPETITION_WINNER':
   return {
     ...state, 
     competition: {
       ...action.competition,
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
    var winning_art = winnerAndLoser(state.competition, action.winner_id).winner;
    var losing_art = winnerAndLoser(state.competition, action.winner_id).loser;
    return {
       ...state, 
       competition: {
         ...action.competition,
         ...state.competition, 
         winning_art: winning_art, 
         losing_art:  losing_art,
         shareTitle: `${winning_art.name} battled ${losing_art.name} AND WON! on artvsart`,
         winnerSelected: true,
         art_percentages: action.competition.art_percentages,
         isFetching: false,
         closeModal: false,
         isResult: true,
         errors: null
       }
     }
  case "CLOSE_COMPETITION_MODAL":
    return {
      ...state, 
      competition: {
        ...action.competition,
        ...state.competition,
        closeModal: true
      }
    } 
  }
  return state;
}

const winnerAndLoser = (competition, winner_id) => {
  const art_pair = [competition.art, competition.challenger];
  const winning_art = art_pair.find( (art) => art.id == winner_id);
  const losing_art = art_pair.find( (art) => art.id != winner_id);
  return {
    winner: winning_art,
    loser: losing_art
  }
}

export default competitionReducer