import React from 'react';
import Helmet from 'react-helmet';
import Radium from 'radium';
import {connect} from 'react-redux';
import WinnerModalContents from './winnerModalContents.js';
import Competition from './competition.js';
import ArtInfo from '../art/artInfo.js'
import PromptToSignUp from './promptToSignUp.js'
import {openModal, closeModal} from '../../actions/app.js'
import {getBattle} from '../../utils/ajaxHelpers.js';
import {getCompetitionData, selectCompetitionWinner} from '../../actions/competitions.js';
import {handleCompetitionModal} from '../../actions/userAuth.js'
import MainButton from '../elements/button.js'
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseStyles from '../../styles/base.js';



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
    this.componentDidMount = this.componentDidMount.bind(this);
    this.signUp = this.signUp.bind(this);
    this.displayInfo = this.displayInfo.bind(this);
    this.closeInfo = this.closeInfo.bind(this);
    this.setupKeyShortcuts = this.setupKeyShortcuts.bind(this);
    this.keyFunction = this.keyFunction.bind(this);
    this.modalKeyFunction = this.modalKeyFunction.bind(this);
    this.setupCompetition = this.setupCompetition.bind(this);
    this.nextCompetition = this.nextCompetition.bind(this);
  }
  
  componentWillMount(){
    this.state = {
      artInfoVisible: false,
      visibleArt: {},
      competition: {
        winner_selected: false
      }
    }
  }
  
  componentDidMount(){
    this.setupCompetition();
    this.setupKeyShortcuts();     
  }
  
  componentWillUnmount(){
    window.removeEventListener("keydown", this.keyFunction);
    window.removeEventListener("keydown", this.modalKeyFunction);
  }
  
  signUp(e){
    const text = e ? e.target.innerText : ""
    this.props.handleCompetitionModalState(text);
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
    this.props.openAppModal();
  }
  
  closeInfo(){
    this.setState({
      artInfoVisible: false
    })
    this.props.closeAppModal();
  }
  
  setupKeyShortcuts(){
    window.addEventListener("keydown", this.keyFunction);
  }
  
  keyFunction(event){
    if (this.props.winnerSelected || this.props.app.modalOpen) {
      return false
    }
    switch (event.which) {
    case 49:
      this.props.selectWinnerViaKeyboard(this.props.competition.art.id);
      window.addEventListener("keydown", this.modalKeyFunction);
      return false
    case 50:
      this.props.selectWinnerViaKeyboard(this.props.competition.challenger.id);
      window.addEventListener("keydown", this.modalKeyFunction);
      return false
    default: 
      return false
    }

  }
  
  modalKeyFunction(event){
    if (event.which != 13) {
      console.log('returning false')
      return false
    } 
    
    if (this.props.competition.errors) {
            console.log('errs')
      this.props.handleCompetitionModalState('')
    } else {
            console.log('should setu')
      this.setupCompetition()
    }
  }
  
  setupCompetition(){
    if (this.props.competition.id == 0 || this.props.competition.isResult == true ) {      
      
      this.props.getCompetition(); 
    }

  }
  
  nextCompetition(){
    if (this.props.location == null ) {
      this.context.router.push("/competition")
    }
    this.setupCompetition()
  }
  
  render(){
    const artInfoAction = <MainButton label="Close" action={this.closeInfo} />;

    return (
    
      <div style={[baseStyles.container, this.props.styles]}>
        <Helmet title="Art Vs Art: FIGHT" />
        <Competition displayInfo={this.displayInfo} competition={this.props.competition}/>
    
        <MuiThemeProvider>
          <div>
            <Dialog open={this.props.competition.winnerSelected} modal>
              <WinnerModalContents competition={this.props.competition} nextCompetition={this.nextCompetition} />
            </Dialog>

            <Dialog 
              open={this.state.artInfoVisible} 
              onRequestClose={this.closeInfo} 
              autoScrollBodyContent
              actions={artInfoAction}
              contentStyle={{width: '100%'}}
            >
              <ArtInfo art={this.state.visibleArt} />
            </Dialog>
              
              {this.props.competition.errors && 
                <PromptToSignUp 
                  errors={this.props.competition.errors}
                  open={!this.props.competition.closeModal} 
                  handleClose={this.signUp}
                />
              }
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

CompetitionContainer.propTypes = {
  competition: React.PropTypes.object.isRequired,
  app: React.PropTypes.object.isRequired,
  getCompetition: React.PropTypes.func.isRequired,
  handleCompetitionModalState: React.PropTypes.func.isRequired,
  selectWinnerViaKeyboard: React.PropTypes.func.isRequired
}

CompetitionContainer.contextTypes = {
  store: React.PropTypes.object,
  router: React.PropTypes.object
}

const mapStateToProps = (store) => ({
  competition: store.competitionState.competition,
  app: store.appState
})

const mapDispatchToProps = (dispatch) => ({
  getCompetition(){
    dispatch(getCompetitionData());
  },
  handleCompetitionModalState(result){
    dispatch(handleCompetitionModal(result));
  },
  selectWinnerViaKeyboard(artId){
    dispatch(selectCompetitionWinner(artId));
  },
  openAppModal(){
    dispatch(openModal());
  },
  closeAppModal(){
    dispatch(closeModal());
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Radium(CompetitionContainer))