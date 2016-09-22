import React from 'react';
import Modal from 'react-modal';
import {ModalContents} from '../modal_contents.js';
import {Competition} from '../competition.js';
import AjaxHelpers from '../../utils/ajax_helpers.js';

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
    
export default class CompetitionContainer extends React.Component{
  constructor(){
    super();
    Modal.setAppElement('#app');    
    this.openWinner = this.openWinner.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.selectWinner = this.selectWinner.bind(this);
    this.bindEscape();
  }
  
  componentWillMount(){
    this.state = {
      modalState: false,
      share_title: '',
      competition: {
        id: 0,
        art: {
          id: 1, 
          name: "Rakim's Paid in Full", 
          description: "The god Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
          image: 'http://placehold.it/250x250'
        },
        challenger: {
          id: 2, 
          name: "Michaelangelo's David", 
          description: "A Legendary Sculpture",
          image: 'http://placehold.it/250x250'
        },
        share_title: ""
      },
      winning_art: {
        
      },
      losing_art: {
      },
      art_percentages: {},
      loading: true
    }
   
  }
  
  componentDidMount(){
    let competition = AjaxHelpers.getBattle().then(res => {
      res.competition && this.stageCompetition(res);
    });
  }

  // now it feels as if the 
  stageCompetition(response){
    let competition = response.competition;
    this.setState({
      competition: {
        ...this.state.competition,
        id: competition.id,
        art: competition.art,
        challenger: competition.challenger,
        share_title: `Battling ${competition.art.name} Vs ${competition.challenger.name}`
      },
      loading: false
    })
  }
  
  selectWinner(winner){
    this.setState({loading: true});
    AjaxHelpers.selectWinner(this.state.competition.id, winner).then(res => {
      this.openWinner(res.competition);
      AjaxHelpers.getBattle().then(res => {
        this.stageCompetition(res);
      });
    });
  }
  
  openWinner(competition){
    this.props.updateCount();
    this.setState({
      modalState: true,
      winning_art: competition.winning_art,
      losing_art: competition.losing_art,
      art_percentages: competition.art_percentages,
      share_title: `${competition.winning_art.name} by ${competition.winning_art.creator} WON!!`
    });
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
        <Competition share_title={this.state.share_title} loading={this.state.loading} competition={this.state.competition} selectWinner={this.selectWinner}/>
        <Modal style={customStyles} isOpen={this.state.modalState}>
          <ModalContents 
            loading={this.state.loading}
            share_title={this.state.share_title} 
            winning_art={this.state.winning_art}
            losing_art={this.state.losing_art}
            percentages={this.state.art_percentages}
            closeModal={this.closeModal}
          />
        </Modal>
      </div>
    )
  }
}
