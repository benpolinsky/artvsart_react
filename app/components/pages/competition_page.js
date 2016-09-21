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
      share_title: ''
    }
  }
  
  openWinner(winningArt){
    this.setState({
      modalState: true,
      winnerName: winningArt.name,
      share_title: `${winningArt.name} WON!!`
    })
  }
  
  closeModal(){
    this.setState({
      modalState: false
    })
  }
  
  bindEscape(){
    document.addEventListener("keypress", (e) => {e.keyCode == 27 && this.closeModal() })
  }
  
  render(){
    return (
      <div className='container'>
        <h1>Battle</h1>
        <Competition selectWinner={this.openWinner}/>
        <Modal style={customStyles} isOpen={this.state.modalState}>
          <h1>Winner is {this.state.winnerName}</h1>
            <div className='share-buttons'>

              <p>Share This Result!</p>
              <ArtShareButtons share_title={this.state.share_title}/>
              
     
            </div>
          <button className="btn btn-primary" 
            onClick={this.closeModal.bind(this)}> Close
          </button>
        </Modal>
      </div>
    )
  }
}

export default CompetitionPage