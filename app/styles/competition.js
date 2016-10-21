import mediaQueries from './mediaQueries.js'

const compeititonStyles = {
  artPair: {
    display: 'flex',
    flexDirection: 'column',
    [mediaQueries.browser]: {
      flexDirection: 'row'
    }
  },
  art: {
    width: '100%',
    boxSizing: 'border-box',
    padding: 30,
    [mediaQueries.browser]: {
      width: 'auto',
      flex: 1,
      width: '44%',
      height: 560,
      padding: 10
    },
    imageContainer: {
      height: 400,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    
    image: {
      maxHeight: 400,
      maxWidth: '100%',
      margin: '0 auto 5px auto',
      display: 'block',
      cursor: 'pointer'
    },
    
    h3: {
      textAlign: 'center',
      marginTop: 10,
      cursor: 'pointer',
      [mediaQueries.browser]: {
        height: 40,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    },
    
    voteButton: {
      margin: '30px auto 10px auto',
      display: 'block',
      [mediaQueries.browser]: {
        margin: '0 auto',
        maxWidth: 200
      }
    }
  },
  
  percentages: {
    textAlign: 'center'
  },
  
  versus: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    margin: '30px auto',
    color: 'black',
    height: 146,
    display: 'block',
    width: 100,
    padding: 10,
    borderLeft: 0,
    borderRight: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [mediaQueries.browser]: {
      alignSelf: 'center',
      width: "13%",
      padding: 5
    }
  },
  
  artInfo: {
    default: {
      display: 'none'
    },
    
    visible: {
      display: 'block',
      position: 'absolute',
      background: 'rgba(0,0,0,0.2)',
      left: 50,
      right: 50,
      bottom: 50,
      top: 50,
      zIndex: 10099
    },
    
    close: {
      cusor: 'pointer'
    }
  },
  
  shareButtons: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    p: {
      fontSize: 20,
      textTransform: 'uppercase',
      fontWeight: '700',
      marginTop: 50
    },
    
    button: {
      textAlign: 'center',
      display: 'inline-block',
      margin: 5,
      cursor: 'pointer'
    }
  },
  
  modal: {
    closeButton: {
      margin: "20px auto 0 auto",
      float: 'none',
      clear: 'both',
      display: 'block'
    },
    
    contents: {
      margin: "0 auto",
      textAlign: 'center'
    },
    
    winnerName: {
      fontStyle: 'italic'
    },
    
    sharePrompt: {
      display: 'block',
      fontWeight: '700'
    },
    
    winnerInfo: {
      padding: '0px 5px'
    },
    
    shareButtons: {
      float: 'none',
      clear: 'both',
      margin: '5px auto 0 auto',
      width: 144
    }
  } 
}

export default compeititonStyles