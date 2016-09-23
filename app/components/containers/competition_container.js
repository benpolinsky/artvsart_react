import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import {ModalContents} from '../modal_contents.js';
import {Competition} from '../competition.js';
import AjaxHelpers from '../../utils/ajax_helpers.js';
import store from '../../store.js';

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
    
class CompetitionContainer extends React.Component{
  constructor(){
    super();
    Modal.setAppElement('#app');    
    this.bindEscape();
  }
  
  componentWillMount(){
    this.state = {
      modalState: false,
      share_title: '',
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

  stageCompetition(response){
    store.dispatch({
      type: "STAGE_COMPETITION",
      competition: response.competition
    });

    this.setState({
      loading: false
    })
  }
  
  bindEscape(){
    document.addEventListener("keyup", (e) => {e.keyCode == 27 && this.closeModal() })
  }
  
  render(){
    return (
      <div className='container'>
        <h1>Battle</h1>
        <Competition share_title={this.state.share_title} loading={this.state.loading} />
        <Modal style={customStyles} isOpen={this.state.modalState}>
          <ModalContents 
            loading={this.state.loading}
            share_title={this.state.share_title} 
            winning_art={this.props.competition.winning_art}
            losing_art={this.props.competition.losing_art}
            percentages={this.props.competition.art_percentages}
            closeModal={this.closeModal}
          />
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = function (store) {
  return {competition: store.competitionState.competition}
}
export default connect(mapStateToProps)(CompetitionContainer)