import * as api from '../utils/ajax_helpers.js';
import * as storage from '../localStorage.js'

export const signUserIn = (user, router) => (dispatch) => {
  dispatch(startSignUserIn(user));
  return api.signIn(user).then(response => {
    if (response.errors != null) {
      console.log(response)
      dispatch(signInUserFailed(response.errors)); 
    } else {
      dispatch(signInUserSuccessful(response.user));
      router.push('/profile');
      dispatch(storeUserCredentials(response.user));
    }
  })
}


const startSignUserIn = (user) => ({
  type: "START_SIGN_USER_IN",
  user: user
})

const signInUserFailed = (user) => ({
  type: "SIGN_IN_USER_FAILED",
  user: user
})

const signInUserSuccessful = (user) => ({
  type: "SIGN_IN_USER_SUCCESSFUL",
  user: user
})

export const signOutUser = (router) => (dispatch) => {
  storage.deleteToken();
  return api.signOut().then(response => {
    console.log(response)
    dispatch(userSignedOut(response.guest_user));
    router.push('/');

  })
}

const userSignedOut = (user) => ({
  type: "USER_SIGNED_OUT",
  user: user
})

export const registerUser = (user, router) => (dispatch) => {
  dispatch(startRegisterUser(user));
  return api.registerUser(user).then(response => {
    if (response.errors != null) {
      console.log(response)
      dispatch(registerUserFailed(response.errors));
    } else {
      dispatch(registerUserSuccessful(response.user));
      router.push(`/competition`);
      dispatch(storeUserCredentials(response.user));
    }
  })
}

const startRegisterUser = (user) => ({
  type: "START_REGISTER_USER",
  user: user
})

const registerUserSuccessful = (user) => ({
  type: "REGISTER_USER_SUCCESSFUL",
  user: user
})

const registerUserFailed = (user) => ({
  type: "REGISTER_USER_FAILED",
  errors: user
})

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
});

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