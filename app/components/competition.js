import React from 'react';
import Art from './art.js'

class Competition extends React.Component {
  constructor(){
      super();
      
      this.selectWinner = this.selectWinner.bind(this);
      this.state = {
        art: {id: 1, name: "Rakim's Paid in Full", description: "The god Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."},
        challenger: {id: 2, name: "Michaelangelo's David", description: "A Legendary Sculpture"}
      }
      this.getBattle();

  }

  getBattle(){
    fetch('http://localhost:3000/api/v1/battle', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json'
      },
      body: {
      }
    }).then(response => { 
      return response.json();
    }).then(res => {
      this.stageCompetition(res);
    });
  }
  
  stageCompetition(response){
    let competition = response.competition;
    this.setState({
      id: competition.id,
      art: competition.art,
      challenger: competition.challenger
    })
  }
  
  selectWinner(winner){
    fetch('http://localhost:3000/api/v1/choose/', {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        competition: {
          id: this.state.id,
          winner_id: winner
        }
      })
    }).then(response => {
      return response.json()
    }).then(res => {
      console.log(res);
    });
    
  }
  
  render(){
    return (
      <div className='competition'>
        <Art key={this.state.art.id} id={this.state.art.id} selectWinner={this.selectWinner} name={this.state.art.name} description={this.state.art.description}/>
        <Art key={this.state.challenger.id} id={this.state.challenger.id} selectWinner={this.selectWinner} name={this.state.challenger.name} description={this.state.challenger.description}/>
      </div>
    )
  }
}

export default Competition