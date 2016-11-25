import mediaQueries from './mediaQueries.js'

const forms = {
  centered: {
    padding: 40,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
    fields: {
      marginTop: 20,
      maxWidth: 600,
      width: '100%'
    }
  },
  
  fieldContainer: {
    margin: '10px 0',
    float: "left",
    clear: "both",
    width: "100%"
  },
  colorPicker: {
    width: 252, 
    margin: '30px auto',
    padding: '20px 0 0 0', 
    float: 'none',
    clear: 'both'
  },
  label: {
    float: "left",
    clear: 'both',
    width: "100%",
    fontSize: 12,
    fontColor: "#798386"
  },
  
  error: {
    fontSize: 10,
    color: 'red'
  },
  
  basicField: {
    clear: 'both',
    width: 256,
    margin: '4px auto 0 auto',
    boxSizing: 'border-box',
    float: 'none',
    [mediaQueries.browser]: {
      width: "100%",
      float: "left"
    }
  },
  
  bottomBorder: {
    borderWidth: '0 0 1px 0',
    borderColor: 'darkgrey',
    borderRadius: '0',
    borderStyle: 'solid',
    outline: 'none',
    ':focus': {
      borderColor: '#167a59',
      transition: 'border-color 300ms ease-in-out'
    }
  },
  textarea: {
    height: 'auto',
    overflowY: 'auto',
    resize: 'vertical'
  },
  
  uploadToS3: {
    float: 'left',
    clear: 'both',
    padding: '20px 20px 20px 0',
    width: '100%'
  },
    
  searchResult: {
    position: 'relative',
    textAlign: 'center',
    paddingBottom: 50,

    imageContainer: {
      height: 150,
      
      image: {
        maxHeight: 150
      }
    },
    
    heading: {
      height: 60
    }
  },
  
  auth: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    opacity: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.541176)',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    willChange: 'opacity',
    transform: 'translate3d(0,0,0)',    
    transition: "left 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
    zIndex: 1200,
    pointerEvents: 'auto'
  },
  
  authForm: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1201,
    background: 'white',
    padding:50,
    boxSizing: 'border-box',
    width: '100%',
    textAlign: 'center',
    height: 375,
    [mediaQueries.browser]: {
      width: 350,
      textAlign: 'left'
    }
  },
  formError: {
    color: 'red'
  }

}

export default forms