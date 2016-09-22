import React from 'react';
import Menu from './components/menu';
import AjaxHelpers from './utils/ajax_helpers.js';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

class App extends React.Component {
  constructor(){
    super();
    this.updateCount = this.updateCount.bind(this);
  }
  
  componentWillMount(){
    this.state = {
      total_pieces_of_art_in_catalog: 0,
      total_pieces_of_art_judged: 0,
      total_finished_competitions: 0
    }
  }
  
  componentDidMount(){
    this.updateCount();
  }
  
  updateCount(){
    AjaxHelpers.getArtInfo().then(res => {
      this.setState({
        total_pieces_of_art_in_catalog: res.total_pieces_of_art_in_catalog,
        total_pieces_of_art_judged: res.total_pieces_of_art_judged,
        total_competitions: res.total_competitions
      });
    });
  }
  
  render(){
    return (
      <div>
        <DevTools />
        <Menu total_art={this.state.total_pieces_of_art_in_catalog} 
              total_art_judged={this.state.total_pieces_of_art_judged} 
              finished_competitions={this.state.total_competitions} />
        <div>{
          React.cloneElement(this.props.children, {updateCount: this.updateCount})
        }</div>

      </div>
    )
  }
  
}

export default App