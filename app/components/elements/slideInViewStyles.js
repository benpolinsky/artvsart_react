import mediaQueries from '../../styles/mediaQueries.js';

export default {
  container: {
    position: 'fixed',
    right: 0,
    top: 0,
    height: '100%',
    background: 'white',
    zIndex: 99999,
    width: '100%',
    overflow: 'auto', 
    [mediaQueries.browser]: {
      width: 500
    }
  }
}