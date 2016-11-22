const baseContainer = {
    padding: 0,
    boxSizing: "border-box",
    maxWidth: 1500,
    margin: '0 auto'
}

const baseStyles = {
  container: baseContainer,
  mainTitle: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '100',
    padding: "20px 0"
  },
  traditionalLink: {
    fontSize: 12,
    color: 'blue',
    textAlign: 'center',
    margin: '10px 0 0 0',
    display: 'inline-block',
    cursor: 'pointer',
  },
  inlineSeparator: {
    fontSize: 12,
    color: 'black',
    display: 'inline-block',
    margin: '0 4px'
  },
  centeredPage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 20
  },
  mainContainer: {
    minHeight: 'calc(100% - 90px)',
    paddingBottom: 90,
    position: "relative"
  },
  mainContent: {
    paddingBottom: 50
  },
  subheader: {
    fontSize: 20,
    marginBottom: 10
  },
  paddedContainer: (paddingSize=10) => ({
    ...baseContainer,
    padding: paddingSize,
    lineHeight: 1.3
  }),
  paragraph: {
    marginBottom: 10,
    fontSize: 14
  },
  homeParagraph: {
    fontSize: 18,
    margin: "10px auto",
    maxWidth: 800,
    textAlign: 'center',
    lineHeight: 1.3
  },
  center: {
    textAlign: 'center',
    margin: '0 auto',
    display: 'block'
  }
}

export default baseStyles