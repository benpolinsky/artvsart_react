const initialAppState = {
  totals: {
    total_art: 0,
    total_art_judged: 0,
    finished_competitions: 0
  }
}

const AppReducer = (state=initialAppState, action) => {
  switch (action.type) {
  case "GET_GENERAL_ART_INFO":
    return {...state, totals: {
        total_art: action.totals.total_pieces_of_art_in_catalog,
        total_art_judged: action.totals.total_pieces_of_art_judged,
        finished_competitions: action.totals.total_competitions
      }
    }
  }
  
  return state
}

export default AppReducer