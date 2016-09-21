import React from 'react';
import Menu from './components/menu';
import AjaxHelpers from './utils/ajax_helpers.js';

class App extends React.Component {
  constructor(){
    super();
  }
  
  componentWillMount(){
    this.state = {
      total_pieces_of_art_in_catalog: 0,
      total_pieces_of_art_judged: 0,
      total_finished_competitions: 0
    }
  }
  
  componentDidMount(){
    this.updateMenu();
  }
  
  updateMenu(){
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
        <Menu total_art={this.state.total_pieces_of_art_in_catalog} 
              total_art_judged={this.state.total_pieces_of_art_judged} 
              finished_competitions={this.state.total_competitions} />
        {this.props.children}
      </div>
    )
  }
  
}

export default App