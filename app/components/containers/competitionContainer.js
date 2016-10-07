import React from 'react';
import {connect} from 'react-redux';
import {ModalContents} from '../modalContents.js';
import {Competition} from '../competition.js';
import {getBattle} from '../../utils/ajaxHelpers.js';
import {getCompetitionData} from '../../actions/index.js';
import {handleCompetitionModal} from '../../actions/userAuth.js'
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
    this.componentDidMount = this.componentDidMount.bind(this);
    this.signUp = this.signUp.bind(this);
    this.displayInfo = this.displayInfo.bind(this);
    this.closeInfo = this.closeInfo.bind(this);
  }
  
  componentWillMount(){
    this.state = {
      artInfoVisible: false,
      visibleArt: {}
    }
  }
  
  componentDidMount(){
    if (this.props.competition.id == 0) {
      this.props.getCompetition();      
    }  
  }
  
  signUp(e){
    const router = this.context.router;
    this.props.handleClose(e.target.innerText, router);
  }
  
  displayInfo(art){
    const competition_pair = [this.props.competition.art, this.props.competition.challenger];
    const visibleArt = competition_pair.filter((i) => {
      return i.id == art
    });
    
    this.setState({
      artInfoVisible: true,
      visibleArt: visibleArt[0]
    })
  }
  
  closeInfo(){
    this.setState({
      artInfoVisible: false
    })
  }
  
  render(){
    const winnerSelected = this.props.competition.winnerSelected;
    return (
    
      <div className='container'>
        <h1 className='mainTitle'>Battle!</h1>
        <Competition displayInfo={this.displayInfo} handleClose={this.signUp} competition={this.props.competition}/>
    
        <MuiThemeProvider>
          <div>
            <Dialog open={winnerSelected} modal={true}>
              <ModalContents competition={this.props.competition} closeModal={this.props.getCompetition} />
            </Dialog>
            <Dialog open={this.state.artInfoVisible} modal={false} onRequestClose={this.closeInfo}>
              <p>Art info {this.state.visibleArt.name}</p>
            </Dialog>
          </div>
        </MuiThemeProvider>
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