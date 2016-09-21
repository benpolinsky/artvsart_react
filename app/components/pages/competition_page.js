import React from 'react';
import Modal from 'react-modal';
import Competition from '../competition.js';
import ArtShareButtons from '../art_share_buttons.js';

const customStyles = {
  overlay: {
    top     : 0,
    left    : 0,
    right   : 0,
    bottom  : 0
  },
  content: {
    top:          '100px',
    left:         '100px',
    right:        '100px',
    bottom:       '100px',
    borderRadius: '0px'        
  }
}
    
class CompetitionPage extends React.Component{
  constructor(){
    super();
    Modal.setAppElement('#app');    
    this.openWinner = this.openWinner.bind(this);
    this.bindEscape();
  }
  
  componentWillMount(){
    this.state = {
      modalState: false,
      share_title: '',
      competition: {
        winning_art: {},
        losing_art: {},
        art_percentages: {}
      }
    }
  }
  
  openWinner(competition){
    console.log(competition);
    this.setState({
      modalState: true,
      competition: competition,
      share_title: `${competition.winning_art.name} by ${competition.winning_art.creator} WON!!`
    })
  }
  
  closeModal(){
    this.setState({
      modalState: false
    })
  }
  
  bindEscape(){
    document.addEventListener("keyup", (e) => {e.keyCode == 27 && this.closeModal() })
  }
  
  render(){
    return (
      <div className='container'>
        <h1>Battle</h1>
        <Competition selectWinner={this.openWinner}/>
        <Modal style={customStyles} isOpen={this.state.modalState}>
          <div className='modal-contents'>
            <h2>Winner!</h2>
            <h3 className="winner-info"> 
              <span className="winner-name">
                {this.state.competition.winning_art.name} 
              </span> 
               by
              <span className="winner-creator"> 
                {this.state.competition.winning_art.creator}
                ({this.state.competition.art_percentages.winner_winning_percentage})
              </span>  
              against
                
              <span className="loser-name">
                {this.state.competition.losing_art.name} 
              </span> 

              <span className='loser-creator'>
                {this.state.competition.losing_art.creator} 
                ({this.state.competition.art_percentages.loser_winning_percentage}))
              </span>
              </h3>
            <span className='share-prompt'>Share This Result!</span>
            <div className='share-buttons'>
              <ArtShareButtons className='competition-winner-share' share_title={this.state.share_title}/>
            </div>
    
            <button className="btn close-modal-btn btn-lg btn-primary" 
              onClick={this.closeModal.bind(this)}> Next Battle!
            </button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default CompetitionPage