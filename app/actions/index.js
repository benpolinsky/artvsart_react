import * as api from '../utils/ajax_helpers.js';
import * as storage from '../localStorage.js'

export const stageCompetition = (response) => ({
  type: "RECEIVE_COMPETITION",
  competition: response.competition
});

export const getCompetitionData = () => (dispatch) => {
  dispatch(fetchCompetition());
  return api.getBattle().then(response => {
    dispatch(stageCompetition(response));
  })
}

const fetchCompetition = () => ({
  type: "REQUEST_COMPETITION"
});


export const selectCompetitionWinner = (winner_id) => (dispatch, getState) => {
  dispatch(startSelectCompetitionWinner());
  const competition = getState().competitionState.competition.id; 
  return api.selectWinner(competition, winner_id).then(response => {
    
    if (response.competition.errors != null) {
      dispatch(selectCompetitionWinnerFailed(response.competition));
    } else {
      dispatch(receiveCompetitionWinner(response.competition, winner_id));
      dispatch(getGeneralArtInfo());
    }

  });
};

const startSelectCompetitionWinner = () => ({
  type: 'START_SELECT_COMPETITION_WINNER'
})

const receiveCompetitionWinner = (competition, winner_id) => ({
  type: 'SELECT_COMPETITION_WINNER',
  competition: competition,
  winner_id: winner_id
});

const selectCompetitionWinnerFailed = (competition) => ({
  type: "SELECT_COMPETITION_WINNER_FAILED",
  errors: competition.errors
})

export const getGeneralArtInfo = () => (dispatch) => {
  dispatch(startGeneralArtInfo());
  return api.getArtInfo().then(response => {
    dispatch(receiveGeneralArtInfo(response));
  });
};
  

const startGeneralArtInfo = () => ({
  type: "START_GENERAL_ART_INFO"
})

const receiveGeneralArtInfo = (totals) => ({
  type: "GET_GENERAL_ART_INFO",
  totals: totals
})


export const toggleLoader = (visible) => ({
  type: 'TOGGLE_LOADER',
  visible: visible
});


