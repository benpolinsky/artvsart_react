import React from 'react';
import Loader from 'react-loader-advanced';
import Art from './art.js';
import ArtShareButtons from './art_share_buttons.js';
import AjaxHelpers from '../utils/ajax_helpers.js';

const spinner = <span className="fa-spinner fa"></span>;

class Competition extends React.Component {
  constructor(){
      super();  
      this.select = this.select.bind(this);
  }

  componentWillMount(){
    this.state = {
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
      loading: true,
      share_title: ""
    }
  }
  
  componentDidMount(){
    this.setState({loading: false })
    let competition = AjaxHelpers.getBattle().then(res => {
      res.competition && this.stageCompetition(res);
    });
  }

  // now it feels as if the 
  stageCompetition(response){
    let competition = response.competition;
    this.setState({
      id: competition.id,
      art: competition.art,
      challenger: competition.challenger,
      loading: false,
      share_title: `Battling ${competition.art.name} Vs ${competition.challenger.name}`
    })
  }
  
  select(winner){
    this.setState({loading: true});
    AjaxHelpers.selectWinner(this.state.id, winner).then(res => {
      this.props.selectWinner(res.competition);
      AjaxHelpers.getBattle().then(res => {
        this.stageCompetition(res);
      });
    });
  }
  
  render(){
    return (
      <div className='competition'>
        <Loader foregroundStyle={{foregroundColor: 'black'}} backgroundStyle={{backgroundColor: 'transparent'}} show={this.state.loading} message={spinner}  >
          <Art key={this.state.art.id} art={this.state.art} selectWinner={this.select}/>
          <Art key={this.state.challenger.id} art={this.state.challenger} selectWinner={this.select}/>

          <div className='share-buttons'>

            <p>Share This Battle!</p>
            <ArtShareButtons className="competition-share" share_title={this.state.share_title}/>
           
               
          </div>
        </Loader>
      </div>
    )
  }
}

export default Competition