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
    padding: 0,
    position: 'relative',
    [mediaQueries.browser]: {
      width: 'auto',
      flex: 1,
      width: '44%',
      height: 640,
      padding: "0 0px 10px 0px"
    },
    category: {
      padding: 5, 
      width: 'auto', 
      display: "inline-block", 
      fontSize: 14, 
      fontWeight: 100,
      letterSpacing: '0.05em',
      position: 'absolute', 
      top: 0,
      textTransform: 'lowercase',
      zIndex: 1,
      [mediaQueries.browser]: {
        fontSize: 22,
        display: 'block',
        position: 'relative',
        textAlign: 'center',
        marginBottom: 10
      }
    },
    imageContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 145,
      overflow: 'hidden',
      position: 'relative',
      [mediaQueries.browser]: {
        height: 500
      }
    },
    image: {
      width: '100%',
      margin: '0 auto 5px auto',
      display: 'block',
      cursor: 'pointer',
      [mediaQueries.browser]: {
        maxHeight: '100%',
        width: 'auto',
        height: 'auto',
        margin: '0'
      }
    },
    infoIcon: {
      position: 'absolute', 
      right: 5, 
      bottom: 5, 
      cursor: 'pointer',
      [mediaQueries.browser]: {
        display: 'none'
      }
    },
    h3: {
      textAlign: 'left',
      margin: '5px 0 0 5px',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: 12,
      [mediaQueries.browser]: {
        fontSize: 18,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'center'
      }
    },
    
    voteButton: {
      margin: '30px auto 10px auto',
      display: 'block',
      [mediaQueries.browser]: {
        margin: '0 auto',
        maxWidth: "100%"
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
    fontSize: 12,
    marginBottom: 4,
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
      cursor: 'pointer'
    },

    labels: {
      fontWeight: 700,
      width: 80,
      display: 'inline-block'
    },
    
    body: {
      fontSize: 12,
      margin: '6px 0'
    }
  },
  
  shareButtons: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginRight: 10,
    p: {
      fontSize: 20,
      textTransform: 'uppercase',
      fontWeight: '700',
      marginTop: 50
    },
    
    button: {
      textAlign: 'center',
      display: 'inline-block',
      margin: '5px 0 5px 0',
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
      fontSize: 14,
      color: 'black',
      fontWeight: 400
    },
    
    loser: {
      fontSize: 12,
      fontWeight: 400
    },
    
    wins: {
      fontSize: 37,
      color: 'black',
      margin: "2px 0 8px 0"
    },
    
    consensus: {
      fontSize: 14,
      margin: '15px auto'
    },
    
    sharePrompt: {
      display: 'block',
      fontWeight: '700',
      margin: '10px auto'
    },
    
    winnerInfo: {
      padding: '0px 5px'
    },
    
    shareButtons: {
      clear: 'both',
      margin: '20px auto 0 auto',
      width: 256,
      display: 'flex',
      flexDirection: 'row-reverse',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  
  errorModal: {
    width: '80%',
    textAlign: 'center',
    fontWeight: '600',
    
    title: {
      fontWeight: '400',
      fontSize: 26,
      textTransform: 'uppercase',
      textAlign: 'center',
      paddingBottom: 4
    },
    
    body: {
      fontSize: 12,
      margin: '0 auto 20px auto',
      borderRadius: 0,
      width: 256
    }
    
  }
}

export default compeititonStyles