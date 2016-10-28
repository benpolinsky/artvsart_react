import React from 'react'
import {connect} from 'react-redux'
import {getUserInfo} from '../actions/userAuth.js';
import ApiDown from './apiDown.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress'
import loaderStyles from '../styles/loader.js'
import Loader from 'react-loader-advanced';

export default function appLoader(Component){
 
  class GuaranteedApp extends React.Component{
    componentWillMount(){
      this.props.initializeApp();
    }

    render(){
      const circularLoader = <MuiThemeProvider><CircularProgress /></MuiThemeProvider>
      return(
      
        <Loader foregroundStyle={loaderStyles.foreground} backgroundStyle={loaderStyles.background} message={circularLoader} show={this.props.app.loading}>
      {
          !this.props.app.apiError ?      
          <Component {...this.props} /> :
          <ApiDown />
      }

          
        </ Loader>
      )
    }
  }
  

  
  const mapDispatchToProps = (dispatch) => ({
    initializeApp(){
      dispatch(getUserInfo());
    } 
  });
  
  const mapStateToProps = (state) => ({
    app: state.appState
  })
  
  GuaranteedApp.propTypes = {
    initializeApp: React.PropTypes.func.isRequired,
    app: React.PropTypes.object.isRequired
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(GuaranteedApp)
} 