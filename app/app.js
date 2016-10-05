import React from 'react';
import Menu from './components/menu';
import {connect} from 'react-redux';
import {getGeneralArtInfo} from './actions/index.js';
import {getUserInfo} from './actions/userAuth.js';
import * as storage from './localStorage.js'
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    paddingTop: 40
  }
});

class App extends React.Component {
  constructor(){
    super();
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  
  componentDidMount(){
    this.props.initializeApp();
  }
  
  render(){
    return (
      <div>
        <Menu totals={this.props.app.totals} user={this.props.user} />
        <div className={css(styles.container)}>{this.props.children}</div>
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
  } 
})

App.propTypes = {
  initializeApp: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)