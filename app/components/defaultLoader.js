import React from 'react';
import Loader from 'react-loader-advanced';
import loaderStyles from '../styles/loader.js';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const circularLoader = <MuiThemeProvider><CircularProgress /></MuiThemeProvider>;

const DefaultLoader = ({children, showing}) => {
  return(
    <Loader show={showing} foregroundStyle={loaderStyles.foreground} backgroundStyle={loaderStyles.background} message={circularLoader}>
      {children}
    </Loader>
  )
}

export default DefaultLoader