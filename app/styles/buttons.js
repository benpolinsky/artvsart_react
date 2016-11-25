import mediaQueries from './mediaQueries';

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
    fontSize: 20,
    fontWeight: 700,
    height: 40,
    textTransform: "uppercase",
    width: 180,
    margin: '30px auto',
    ':hover': {
      background: '#3f7aa3',
      color: 'white'
    }
  },
  warn: {
    ...baseButtonStyles,
    background: 'none lightgrey',
    ':hover': {
      background: '#fc8181'
    }
  },
  responsive: {
    ...baseButtonStyles,
    width: '100%',
    [mediaQueries.browser]: {
      width: 256
    }
  }
}

export const linkButton = {
  ...baseButtonStyles,
  display: 'inline',
  padding: 5,
  textDecoration: 'none',
  fontSize: 11,
  top: 14,
  position: 'relative'
  
}


export default button