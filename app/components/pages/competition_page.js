import React from 'react';
import Modal from 'react-modal';
import Competition from '../competition.js';
import WinnerModal from '../winner_modal.js';
import {ShareButtons, ShareCounts, generateShareIcon} from 'react-share';

const {
  FacebookShareButton,
  TwitterShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

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
        <Modal isOpen={this.state.modalState}>
          <h1>Winner is {this.state.winnerName}</h1>
            <div className='share-buttons'>

              <p>Share This Result!</p>

              <FacebookShareButton
                url={'http://artvsart.com'}
                title={this.state.share_title}
                className="Demo__some-network__share-button">
                <FacebookIcon size={32} round />
              </FacebookShareButton>
  
               <TwitterShareButton
                 url='http://www.artvsart.com'
                 title={this.state.share_title}
                 className="Demo__some-network__share-button">
                 <TwitterIcon size={32} round />
               </TwitterShareButton>
     
            </div>
          <button onClick={this.closeModal.bind(this)}>Close</button>
        </Modal>
      </div>
    )
  }
}

export default CompetitionPage