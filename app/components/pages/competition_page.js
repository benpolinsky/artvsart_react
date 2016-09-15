import React from 'react';
import Competition from '../competition.js';
import WinnerModal from '../winner_modal.js';


class CompetitionPage extends React.Component{
  constructor(){
    super()
    this.openWinner = this.openWinner.bind(this)
    this.state = {
      modalState: 'hidden'
    }
  }
  
  openWinner(winningArt){
    this.setState({
      modalState: 'visible',
      winnerName: winningArt.name
    })
  }
  
  render(){
    return (
      <div className='container'>
        <h1>Battle</h1>
        <Competition selectWinner={this.openWinner}/>
        <WinnerModal openState={this.state.modalState} winnerName={this.state.winnerName} />
      </div>
    )
  }
}

export default CompetitionPage