import React from 'react';
import Helmet from 'react-helmet';
import {metrics} from 'react-metrics';
import GoogleAnalytics from './googleAnalytics.js';
import Menu from './menu';
import Footer from './footer.js'
import AuthForms from './forms/authForms.js'
import {openSignUp} from '../actions/userAuth.js';
import {dismissNotice} from '../actions/app.js';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';
import Radium from 'radium'
import {StyleRoot} from 'radium'
import baseStyles from '../styles/base.js';

const noticeStyles = {
  padding: "10px 24px",
  height: 'auto',
  lineHeight: '18px',
  backgroundColor: '#d22929'
}

const reactMetricsConfig = {
    vendors: [{
        name: "Google Analytics",
        api: new GoogleAnalytics({
            trackingId: "UA-87928906-1"
        })
    }],
    pageViewEvent: "pageLoad",
    pageDefaults: () => {
        return {
            siteName: "Art Vs Art io"
        };
    }
}



const App = ({app, user, children, dismiss, showAuthForm}) => {
  return (
  <StyleRoot style={{height: '100%'}}>
    <div style={baseStyles.mainContainer}>
      <Menu totals={app.totals} user={user} showAuthForm={showAuthForm} />
      <AuthForms />
      <main style={baseStyles.mainContent} role='main'>{children}</main>
      <Footer />
      <MuiThemeProvider><Snackbar bodyStyle={noticeStyles} open={app.notice.length > 0} onRequestClose={dismiss} message={app.notice}/></MuiThemeProvider>
    </div>
  </StyleRoot>
  )
}

const mapStateToProps = (store) => ({
  app: store.appState,
  user: store.userState.user
})

const mapDispatchToProps = (dispatch) => ({
  showAuthForm(formType){
    dispatch(openSignUp(formType));
  },
  dismiss(){
    dispatch(dismissNotice())
  }
})

App.propTypes = {
  showAuthForm: React.PropTypes.func.isRequired,
  app: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired
}

export default metrics(reactMetricsConfig)(connect(mapStateToProps, mapDispatchToProps)(App))