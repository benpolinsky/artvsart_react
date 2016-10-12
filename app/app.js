import React from 'react';
import Menu from './components/menu';
import Footer from './components/footer.js'
import AuthForms from './components/forms/authForms.js'
import {connect} from 'react-redux';
import {getGeneralArtInfo} from './actions/index.js';
import {openSignUp} from './actions/userAuth.js';
import * as storage from './localStorage.js'
import { StyleSheet, css } from 'aphrodite'


class App extends React.Component {
  constructor(){
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentWillMount(){
    this.state = {
      displayForm: ""
    }
  }
  
  componentDidMount(){
    this.props.initializeApp();
  }

  render(){
    return (
      <div>
        <div id="mainContainer">
          <Menu totals={this.props.app.totals} user={this.props.user} showAuthForm={this.props.showAuthForm} />
          <AuthForms />
          <div>{this.props.children}</div>
          <Footer />
        </div>
      </div>
    )
  }
  
}

const mapStateToProps = (store) => ({
  app: store.appState,
  user: store.userState.user
})

const mapDispatchToProps = (dispatch) => ({
  initializeApp(){
    dispatch(getGeneralArtInfo());
  },
  showAuthForm(formType){
    dispatch(openSignUp(formType));
  }
})

App.propTypes = {
  initializeApp: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)