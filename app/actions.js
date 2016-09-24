import * as api from './utils/ajax_helpers.js';

const selectCompetitionWinner = (winner_id) => ({
  type: 'SELECT_COMPETITION_WINNER',
  winner_id: winner_id
});

const stageCompetition = (competition) => ({
  type: "STAGE_COMPETITION",
  competition: competition
});

const getCompetitionData = () => {
  return (dispatch) => {
    api.getBattle().then(response => {
      dispatch(stageCompetition(response.competition));
    })
  }
}
export {selectCompetitionWinner, stageCompetition, getCompetitionData};