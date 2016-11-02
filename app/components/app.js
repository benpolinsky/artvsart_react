import React from 'react';
import Menu from './menu';
import Footer from './footer.js'
import AuthForms from './forms/authForms.js'
import {connect} from 'react-redux';
import {openSignUp} from '../actions/userAuth.js';
import baseStyles from '../styles/base.js';

const App = ({app, user, children, showAuthForm}) => {
  return (
    <div style={baseStyles.mainContainer}>
      <Menu totals={app.totals} user={user} showAuthForm={showAuthForm} />
      <AuthForms />
      <main role='main'>{children}</main>
      <Footer />
    </div>
  )
}

const mapStateToProps = (store) => ({
  app: store.appState,
  user: store.userState.user
})

const mapDispatchToProps = (dispatch) => ({
  showAuthForm(formType){
    dispatch(openSignUp(formType));
  }
})

App.propTypes = {
  showAuthForm: React.PropTypes.func.isRequired,
  app: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)