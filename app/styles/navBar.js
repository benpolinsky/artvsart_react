import MediaQueries from './mediaQueries.js'

const browser = MediaQueries.browser

const navBarStyles = { 
  appBar: {
    backgroundColor: 'white',
    boxShadow: 'none',
    borderBottom: "1px solid black",
    height: '100%'
  },
  
  appBarHeading: {
    color: "black",
    overflow: "visible",
    fontSize: 18,
    fontWeight: 400
  },
  
  appBarIcon: {
    marginTop: 7,
  },
  
  userMenuWrapper: {
    width: 50,
    marginTop: 6,
    cursor: 'pointer',
    [browser]: {
      width: 50
    }
  },
  userMenu: {
    marginLeft: 'auto',
    fontSize: 10,
    width: '100%'
  },
  
  authNav: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    boxSizing: "border-box"
  },
  
  authNavListItem: {
    padding: 4,
    boxSizing: "border-box"
  },
  
  authNavListLink: {
    color: 'black',
    minWidth: 'auto',
    fontWeight: 400,
    textTransform: 'none'
  },
  
  label: {
    boxSizing: 'border-box', 
    padding: '0 10px',
    textTransform: 'lowercase'
  }
}


export default navBarStyles