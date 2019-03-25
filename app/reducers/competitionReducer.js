const initialCompetitionState = {
  competition: {
    id: 0,
    art: {
      id: undefined, 
      name: undefined,
      creator: undefined,
      description: undefined,
      image: undefined,
      creation_date: undefined,
      category: {
        name: undefined,
        color: undefined
      }
    },
    challenger: {
      id: undefined, 
      name: undefined,
      creator: undefined,
      description: undefined,
      image: undefined,
      creation_date: undefined,
      category: {
        name: undefined,
        color: undefined
      }
    },
    winning_art: {
      id: undefined, 
      name: undefined,
      creator: undefined,
      description: undefined,
      image: undefined,
      creation_date: undefined,
      category: {
        name: undefined,
        color: undefined
      }
    },
    losing_art: {
      id: undefined, 
      name: undefined,
      creator: undefined,
      description: undefined,
      image: undefined,
      creation_date: undefined,
      category: {
        name: undefined,
        color: undefined
      }
    },
    winner_id: null,
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
        closeModal: true,
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
         shareTitle: `Now Battling: ${action.competition.art.name} vs. ${action.competition.challenger.name} on Art Vs Art!`,
         isFetching: false,
         winnerSelected: false,
         closeModal: true,
         isResult: false,
         errors: null
       }
     }
 case "REQUEST_COMPETITION_FAILED":
   return {
     ...state, 
     competition: {
       ...state.competition,
       isFetching: false,
       errors: action.error
     }
   }
 case "RECEIVE_FINISHED_COMPETITION":
   const artPair = winnerAndLoser(action.competition, action.competition.winner_id)
   var winning_art = artPair.winner;
   var losing_art = artPair.loser;
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
  case "CLOSE_SIGN_UP":
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