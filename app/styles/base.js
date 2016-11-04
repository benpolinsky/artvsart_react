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
    minHeight: 'calc(100% - 150px)',
    paddingBottom: 150,
    position: "relative"
  },
  paddedContainer: (paddingSize=10) => ({
    ...baseContainer,
    padding: paddingSize,
    lineHeight: 1.3,
    item: {
      marginBottom: 10
    }
  })
}

export default baseStyles