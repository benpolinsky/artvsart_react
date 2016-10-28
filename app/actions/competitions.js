import * as api from '../utils/ajaxHelpers.js';
import {openModal, closeModal} from './app.js';

export const stageCompetition = (response) => ({
  type: "RECEIVE_COMPETITION",
  competition: response.competition
});

const displayCompetition = (response) => ({
  type: "RECEIVE_FINISHED_COMPETITION",
  competition: response.competition
});

export const getCompetitionData = (id=null) => {
  return dispatch => {
    dispatch(fetchCompetition());
    dispatch(closeModal());
    if (id != null) {    
      return api.get(`competitions/${id}`).then(response => {
        dispatch(displayCompetition(response))
      });
    } else {
      return api.post('competitions', {}).then(response => {
        dispatch(stageCompetition(response));
      });
    }
  }
  
 
}

const fetchCompetition = () => ({
  type: "REQUEST_COMPETITION"
});


export const selectCompetitionWinner = (winner_id) => (dispatch, getState) => {
  dispatch(startSelectCompetitionWinner());

  const competition = getState().competitionState.competition.id;
  const payload = {
    competition: {
      winner_id: winner_id
    }
  } 
  
  return api.put(`competitions/${competition})`, payload).then(response => {
    if (response.competition.errors != null) {
      dispatch(selectCompetitionWinnerFailed(response.competition));
    } else {
      dispatch(receiveCompetitionWinner(response.competition, winner_id));
      dispatch(getGeneralArtInfo());
    }
    dispatch(openModal());
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
