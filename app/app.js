// this is essentially a Container Component..

import React from 'react';
import Menu from './components/menu';
import {getArtInfo} from './utils/ajax_helpers.js';

class App extends React.Component {
  constructor(){
    super();
    this.updateCount = this.updateCount.bind(this);
  }
  
  componentWillMount(){
    this.state = {
      totals: {
        total_art: 0,
        total_art_judged: 0,
        finished_competitions: 0
      }
    }
  }
  
  componentDidMount(){
    this.updateCount();
  }
  
  updateCount(){
    getArtInfo().then(res => {
      this.setState({
        totals: {
          total_art: res.total_pieces_of_art_in_catalog,
          total_art_judged: res.total_pieces_of_art_judged,
          finished_competitions: res.total_competitions
        }
      });
    });
  }
  
  render(){
    return (
      <div>
        <Menu totals={this.state.totals} />
        <div>{React.cloneElement(this.props.children, {updateCount: this.updateCount})}</div>
      </div>
    )
  }
  
}

export default App