import React from 'react';
import Art from './art.js';
import AjaxHelpers from '../utils/ajax_helpers.js';

class Competition extends React.Component {
  constructor(){
      super();      
      this.selectWinner = this.selectWinner.bind(this);
  }

  componentWillMount(){
    this.state = {
      art: {id: 1, name: "Rakim's Paid in Full", description: "The god Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."},
      challenger: {id: 2, name: "Michaelangelo's David", description: "A Legendary Sculpture"}
    }

    let competition = AjaxHelpers.getBattle().then(res => {
      this.stageCompetition(res);
    });

  }

  // now it feels as if the 
  stageCompetition(response){
    let competition = response.competition;
    this.setState({
      id: competition.id,
      art: competition.art,
      challenger: competition.challenger
    })
  }
  
  selectWinner(winner){
    AjaxHelpers.selectWinner(this.state.id, winner).then(res => {
      let winningArt = res.competition.winning_art;
      this.props.selectWinner(winningArt);
      AjaxHelpers.getBattle().then(res => {
        this.stageCompetition(res);
      });
    });
  }
  
  render(){
    return (
      <div className='competition'>

        <Art key={this.state.art.id} 
             id={this.state.art.id} 
             selectWinner={this.selectWinner} 
             name={this.state.art.name} 
             description={this.state.art.description} />

        <Art key={this.state.challenger.id} 
             id={this.state.challenger.id} 
             selectWinner={this.selectWinner} 
             name={this.state.challenger.name}
             description={this.state.challenger.description} />
             
      </div>
    )
  }
}

export default Competition