const footerStyles = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'black',
  color: 'white',
  height: 200,
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  flexDirection: 'column',
  fontSize: 12,
  padding: '1rem',
  
  link: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700'
  },
  
  socialMedia: {
    marginBottom: 10
  },

  socialMediaLink: {
    marginRight: 5,
    marginLeft: 5,
    first: {
      marginLeft: 0
    },
    last: {
      marginRight: 0
    },
    ':visited': {
      color: 'white'
    }
  }
  
}  

export default footerStyles
// Case for Radium:
// footer#pageFooter .socialMediaLinks a: first-child{
//     margin-left: 0px;
//   }
//
//   footer#pageFooter .socialMediaLinks a: last-child{
//     margin-right: 0px;
//   }
//
//
//   footer#pageFooter a: visited{
//     color: white;
//   }