import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import {ModalContents} from '../modalContents.js';
import {Competition} from '../competition.js';
import {getBattle} from '../../utils/ajaxHelpers.js';
import {getCompetitionData} from '../../actions/index.js';
import {handleCompetitionModal} from '../../actions/userAuth.js'

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
    this.signUp = this.signUp.bind(this);

  }
  
  
  componentDidMount(){
    // initial competition's id = 0
    if (this.props.competition.id == 0) {
      this.props.getCompetition();      
    }
  }
  
  
  bindEscape(){
    document.addEventListener("keyup", (e) => {
      if (e.keyCode == 27 && this.props.competition.winnerSelected) {
        this.props.getCompetition();
      }
    })
  }
  
  signUp(e){
    const router = this.context.router;
    this.props.handleClose(e.target.innerText, router);
  }
  
  render(){
    return (
      <div className='container'>
        <h1 className='mainTitle'>Battle!</h1>
        <Competition handleClose={this.signUp} competition={this.props.competition}/>
        <Modal style={customStyles} isOpen={this.props.competition.winnerSelected}>
          <ModalContents competition={this.props.competition} closeModal={this.props.getCompetition} />
        </Modal>
      </div>
    )
  }
}

CompetitionContainer.contextTypes = {
  store: React.PropTypes.object,
  router: React.PropTypes.object
}

const mapStateToProps = (store) => ({
  competition: store.competitionState.competition
})

const mapDispatchToProps = (dispatch) => ({
  getCompetition(){
    dispatch(getCompetitionData());
  },
  handleClose(result, router){
    dispatch(handleCompetitionModal(result, router));
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(CompetitionContainer)