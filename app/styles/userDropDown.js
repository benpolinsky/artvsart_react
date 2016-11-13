export default {
  triangle: {
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderBottom: '5px solid black',
    position: 'absolute',
    top: -4,
    right: 20
  },
  container: {
    zIndex: 100000,
    width: 300,
    height: 130,
    background: 'white',
    boxShadow: "0 2px 10px rgba(0,0,0,.2)",
    borderLeft: '1px solid #ccc',
    borderRight: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderTop: "1px solid black"
  },
  
  userInfoContainer: {
    margin: '5px 0'
  },
  
  header: {
    padding: 10,
    height: 36,
    borderBottom: '1px solid black',
    display: 'flex',
    flexDirection: "column",
    alignItems: 'flex-end',
    textAlign: 'right',
    justifyContent: 'space-between'
  },
  
  list: {
    height: 'auto'
  },
  
  listItem: {
    padding: '10px 10px 10px 0px',
    borderBottom: '1px solid #ccc',
    cursor: 'pointer',
    textAlign: 'right',
    ':hover': {
      backgroundColor: '#ccc'
    }
  }
  
  
}