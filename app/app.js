import React from 'react';
import Menu from './components/menu';
import AjaxHelpers from './utils/ajax_helpers.js';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

var appState = observable({
  total_art: 0,
  total_art_judged: 0,
  finished_competitions: 0
});


class App extends React.Component {
  constructor(){
    super();
    this.updateCount = this.updateCount.bind(this);
  }
  
  componentWillMount(){
    this.state = appState
  }
  
  componentDidMount(){
    this.updateCount();
  }
  
  updateCount(){
    AjaxHelpers.getArtInfo().then(res => {
      appState.total_art = res.total_pieces_of_art_in_catalog;
      appState.total_art_judged = res.total_pieces_of_art_judged;
      appState.finished_competitions = res.total_competitions;
    });
  }
  
  render(){
    return (
      <div>
        <Menu appState={appState} />
        <div>{
          React.cloneElement(this.props.children, {updateCount: this.updateCount})
        }</div>
        <DevTools/>
      </div>
    )
  }
  
}

export default App