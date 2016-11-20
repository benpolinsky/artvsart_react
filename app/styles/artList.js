import mediaQueries from './mediaQueries.js';

export default {
  container: {
    display: 'flex',
    flexDirection: 'column-reverse',
    [mediaQueries.browser]: {
      display: 'flex', 
      flexDirection: 'row-reverse',
    }
  },
  table: {
    tr: {
      display: 'none',
      [mediaQueries.browser]: {
        display: 'table-row'
      }
    },
    td: {
      float: 'left',
      clear: 'left',
      height: 'auto',
      margin: '5px 0',
      width: '100%',
      boxSizing: 'border-box',
      [mediaQueries.browser]: {
        float: 'none',
        clear: 'none',
        height: 48,
        margin: 0,
        width: 'auto',
        boxSizing: 'auto'
      }
    }
  },
  aux: {
    float: 'none',
    clear: 'none',
    height: 'auto',
    margin: '0 auto',
    width: 'auto',
    boxSizing: 'auto',
    [mediaQueries.browser]: {
      float: 'none', 
      clear: 'both', 
      width: 300, 
      margin: '50px 20px 0 50px'
    }
  }
}

// hide header tr
// td float left + clear left - shabby but works