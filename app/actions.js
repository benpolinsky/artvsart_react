const selectCompetitionWinner = (winner_id) => {
  console.log('selecting' + winner_id);
  return{
    type: 'SELECT_COMPETITION_WINNER',
    winner_id: winner_id
  };
};

const initiateCompetition = (competition) => {
  console.log('staging competition');
  return {
    type: "STAGE_COMPETITION",
    competition: competition
  }
}

export {selectCompetitionWinner, initiateCompetition};