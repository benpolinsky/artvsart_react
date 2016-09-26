import React from 'react';
import Menu from './components/menu';
import {connect} from 'react-redux';
import {getGeneralArtInfo} from './actions.js';

class App extends React.Component {
  constructor(){
    super();
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  
  
  componentDidMount(){
    this.props.getArtInfo();
  }

  render(){
    return (
      <div>
        <Menu totals={this.props.app.totals} />
        <div>{React.cloneElement(this.props.children, {updateCount: this.updateCount})}</div>
      </div>
    )
  }
  
}

const mapStateToProps = (store) => ({
  app: store.appState
})

const mapDispatchToProps = (dispatch) => ({
  getArtInfo(){
    dispatch(getGeneralArtInfo());
  } 
})

App.propTypes = {
  getArtInfo: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)