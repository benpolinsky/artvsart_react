import * as api from '../utils/ajaxHelpers.js';

export const getGeneralArtInfo = () => (dispatch) => {
  dispatch(startGeneralArtInfo());
  return api.get('art').then(response => {
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


