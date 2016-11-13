const baseButtonStyles = {
  color: 'black',
  borderRadius: 0,
  boxShadow: 0,
  background: 'none white',
  border: '1px solid black',
  cursor: 'pointer',
  margin: '10px auto',
  display: 'block',
  fontFamily: 'Raleway',
  fontWeight: 600,
  display: 'block',
  clear: 'both',
  height: 30,
  width: 256,
  transition: 'all 100ms ease-in',
  ':hover': {
    background: 'grey',
    transition: 'all 100ms ease-in',
    color: 'white'
  },
  ':active': {
    background: 'black',
    transition: 'all 100ms ease-in',
    color: 'white'
  },
  ':disabled': {
    background: 'lightgrey',
    transition: 'all 100ms ease-in',
    pointer: "normal"
  }
}

const button = {
  ...baseButtonStyles,
  default: {
  ...baseButtonStyles
  },
  small: {
    ...baseButtonStyles,
    width: 'auto'
  },
  vote: {
    ...baseButtonStyles,
    fontSize: 16,
    fontWeight: 400,
    height: 40,
    textTransform: "uppercase"
  },
  warn: {
    ...baseButtonStyles,
    background: 'none lightgrey',
    ':hover': {
      background: '#fc8181'
    }
  }
}



export default button