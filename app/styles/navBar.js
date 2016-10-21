import MediaQueries from './mediaQueries.js'

const browser = MediaQueries.browser

const navBarStyles = { 
  appBar: {
    backgroundColor: 'white',
    boxShadow: 'none',
    borderBottom: "1px solid black"
  },
  
  appBarHeading: {
    color: "black",
    overflow: "visible"
  },
  
  appBarIcon: {
    marginTop: 10,
  },
  
  userMenuWrapper: {
    width: 200,
    [browser]: {
      width: 'auto'
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
    minWidth: 'auto'
  }
}


export default navBarStyles