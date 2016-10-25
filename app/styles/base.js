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
  centeredPage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 20
  },
  mainContainer: {
    minHeight: 'calc(100% - 250px)',
    paddingBottom: 250,
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