import * as api from '../utils/ajax_helpers.js';
import * as storage from '../localStorage.js'

export const registerUser = (user) => (dispatch) => {
  return api.registerUser(user).then(response => {
    dispatch(storeUserCredentials(response.user));
  })
}

export const loadCredentials = (next_action) => (dispatch) => {
  return api.getToken().then(response => {
    return response
  })
}

export const storeUserCredentials = (user) => (dispatch) => {
  storage.storeToken(user.auth_token);
  dispatch(receiveUserInfo(user));
}

export const receiveUserInfo = (user) => ({
  type: "RECEIVE_USER_INFO",
  user: user
});

export const getUserInfo = () => (dispatch) => {
  return api.userInfo().then(response => {
    dispatch(receiveUserInfo(response.user));
  })
}

const fetchCompetition = () => ({
  type: "REQUEST_COMPETITION"
});4

const stageCompetition = (response) => ({
  type: "RECEIVE_COMPETITION",
  competition: response.competition
});

const getCompetitionData = () => (dispatch) => {
  dispatch(fetchCompetition());
  return api.getBattle().then(response => {
    dispatch(stageCompetition(response));
  })

}

const selectCompetitionWinner = (winner_id) => (dispatch, getState) => {
  dispatch(startSelectCompetitionWinner());
  const competition = getState().competitionState.competition.id; 
  return api.selectWinner(competition, winner_id).then(response => {
    dispatch(receiveCompetitionWinner(response.competition, winner_id));
    dispatch(getGeneralArtInfo());
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



const getGeneralArtInfo = () => (dispatch) => {
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


const toggleLoader = (visible) => ({
  type: 'TOGGLE_LOADER',
  visible: visible
});


export {selectCompetitionWinner, stageCompetition, getCompetitionData, toggleLoader, getGeneralArtInfo};