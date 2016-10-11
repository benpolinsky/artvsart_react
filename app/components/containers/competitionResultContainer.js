import React from 'react';
import {connect} from 'react-redux';
import {CompetitionResult} from '../competitionResult.js';
import ArtInfo from '../artInfo.js'
import {getCompetitionData} from '../../actions/index.js';
import FlatButton from 'material-ui/FlatButton'
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
    
class CompetitionResultContainer extends React.Component{
  constructor(){
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.displayInfo = this.displayInfo.bind(this);
    this.closeInfo = this.closeInfo.bind(this);
  }
  
  componentWillMount(){
    this.state = {
      artInfoVisible: false,
      visibleArt: {},
      competition: {
        
      }
    }
  }
  
  componentDidMount(){
    if (this.props.competition.id == 0) {
      this.props.getCompetition(this.props.params.id);      
    }  
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
    const artInfoAction = <FlatButton label="Close" primary={true} onTouchTap={this.closeInfo} />;
    const art_pair = [this.props.competition.art, this.props.competition.challenger];
    const winning_art = art_pair.find( (art) => art.id == this.props.competition.winner_id);
    const losing_art = art_pair.find( (art) => art.id != this.props.competition.winner_id);
    
    return (
     
    
      <div className='container'>
        <h1 className='mainTitle'>{`${winning_art.name} WINS`}</h1>
        <CompetitionResult
          displayInfo={this.displayInfo} 
          competition={this.props.competition}
          />
    
        <MuiThemeProvider>
          <div>
            <Dialog 
              open={this.state.artInfoVisible} 
              modal={false} 
              onRequestClose={this.closeInfo} 
              autoScrollBodyContent={true}
              actions={artInfoAction}
            >
              <ArtInfo art={this.state.visibleArt} />
            </Dialog>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

CompetitionResultContainer.contextTypes = {
  store: React.PropTypes.object,
  router: React.PropTypes.object
}

const mapStateToProps = (store) => ({
  competition: store.competitionState.competition
})

const mapDispatchToProps = (dispatch) => ({
  getCompetition(id){
    dispatch(getCompetitionData(id));
  },
  handleClose(result, router){
    dispatch(handleCompetitionModal(result, router));
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(CompetitionResultContainer)