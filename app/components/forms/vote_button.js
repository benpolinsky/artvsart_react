import React from 'react';
import store from '../../store.js';
/*

  We still need to fit these parts of selecting a winner.
  1. State of the loader.
  2. State of the modal.
  3. Ajax -> Selecting the Winner
  4. Ajax -> Staging the new competition
  5. Updating the count of total battles

  Modal.setAppElement('#app');   (in constructor)

  selectWinner(winner){
    this.setState({loading: true});
    AjaxHelpers.selectWinner(this.props.competition.id, winner).then(res => {
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
    });
  }

  closeModal(){
    this.setState({
      modalState: false
    })
  }

*/
class VoteButtonContainer extends React.Component {
  render(){
    const props = this.props;
    return(
      <VoteButton onClick={() => 
        store.dispatch({
          type: "SELECT_COMPETITION_WINNER",
          winner_id: props.art_id 
        })
      } />
    )
  }
}

const VoteButton = ({onClick}) => {
  return <a className="btn btn-primary vote-btn" href='#' onClick={onClick}>Vote</a>
}

VoteButton.propTypes = {
  onClick: React.PropTypes.func.isRequired
}

export default VoteButtonContainer