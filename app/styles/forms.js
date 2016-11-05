import mediaQueries from './mediaQueries.js'

const forms = {
  centered: {
    padding: 40,
    borderBottom: '1px solid black',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    fields: {
      marginTop: 20
    }
  },
  
  uploadToS3: {
    float: 'left',
    clear: 'both',
    padding: '20px 20px 20px 0'
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
    transform: 'translateZ(0px)',
    transition: "left 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
    zIndex: 1200,
    pointerEvents: 'auto'
  },
  
  authForm: {
    position: 'absolute',
    right: 0,
    top: 65,
    zIndex: 1201,
    background: 'white',
    padding:50,
    boxSizing: 'border-box',
    width: '100%',
    textAlign: 'center',
    [mediaQueries.browser]: {
      width: 'auto',
      textAlign: 'left'
    }
  },
  formError: {
    color: 'red'
  }

}

export default forms