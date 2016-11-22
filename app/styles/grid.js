import mediaQueries from './mediaQueries.js';

export default {
  twoUp: {
    width: '50%',
    boxSizing: 'border-box',
    padding: 10,
    [mediaQueries.browser]: {
      width: '20%'
    },
    imageContainer: {
      width: '100%',
      height: 150
    }
  } 
}