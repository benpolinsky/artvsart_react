import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import {ModalContents} from '../modal_contents.js';
import {Competition} from '../competition.js';
import {getBattle} from '../../utils/ajax_helpers.js';
import {getCompetitionData} from '../../actions.js'

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
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount(){
    this.props.getCompetition();
  }
  
  bindEscape(){
    document.addEventListener("keyup", (e) => {
      if (e.keyCode == 27 && this.props.competition.winnerSelected) {
        this.props.getCompetition();
      }
    })
  }
  
  render(){
    return (
      <div className='container'>
        <h1>Battle</h1>
        <Competition competition={this.props.competition}/>
        <Modal style={customStyles} isOpen={this.props.competition.winnerSelected}>
          <ModalContents competition={this.props.competition} closeModal={this.props.getCompetition} />
        </Modal>
      </div>
    )
  }
}

CompetitionContainer.contextTypes = {
  store: React.PropTypes.object
}

const mapStateToProps = (store) => ({
  competition: store.competitionState.competition
})

const mapDispatchToProps = (dispatch) => ({
  getCompetition(){
    dispatch(getCompetitionData());
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(CompetitionContainer)