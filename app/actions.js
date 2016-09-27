import * as api from './utils/ajax_helpers.js';

const fetchCompetition = () => ({
  type: "REQUEST_COMPETITION"
})

const stageCompetition = (competition) => ({
  type: "RECEIVE_COMPETITION",
  competition: competition
});

const getCompetitionData = () => {
  return (dispatch) => {
    dispatch(fetchCompetition);
    api.getBattle().then(response => {
      dispatch(stageCompetition(response.competition));
    })
  }
}

const selectCompetitionWinner = (winner_id) => {
  return (dispatch, getState) => {
    const competition = getState().competitionState.competition.id;
    dispatch(startSelectCompetitionWinner());
    api.selectWinner(competition, winner_id).then(response => {
      dispatch(receiveCompetitionWinner(response.competition, winner_id));
      dispatch(getGeneralArtInfo());
    });
  }
};

const startSelectCompetitionWinner = () => ({
  type: 'START_SELECT_COMPETITION_WINNER'
})

const receiveCompetitionWinner = (competition, winner_id) => ({
  type: 'SELECT_COMPETITION_WINNER',
  competition: competition,
  winner_id: winner_id
});



const getGeneralArtInfo = () => {
  return (dispatch) => {
    api.getArtInfo().then(response => {
      dispatch(receiveGeneralArtInfo(response));
    })
  }
};
  

const receiveGeneralArtInfo = (totals) => ({
  type: "GET_GENERAL_ART_INFO",
  totals: totals
})


const toggleLoader = (visible) => ({
  type: 'TOGGLE_LOADER',
  visible: visible
});


export {selectCompetitionWinner, stageCompetition, getCompetitionData, toggleLoader, getGeneralArtInfo};