import React from 'react';
import Loader from 'react-loader-advanced';
import {ShareButtons, ShareCounts, generateShareIcon} from 'react-share';
import Art from './art.js';
import AjaxHelpers from '../utils/ajax_helpers.js';


const {
  FacebookShareButton,
  TwitterShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');


class Competition extends React.Component {
  constructor(){
      super();      
      this.selectWinner = this.selectWinner.bind(this);
  }

  componentWillMount(){
    this.state = {
      art: {id: 1, name: "Rakim's Paid in Full", description: "The god Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."},
      challenger: {id: 2, name: "Michaelangelo's David", description: "A Legendary Sculpture"},
      loading: false,
      share_title: ""
    }
  }
  
  componentDidMount(){
    let competition = AjaxHelpers.getBattle().then(res => {
      this.stageCompetition(res);
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
  
  selectWinner(winner){
    this.setState({loading: true});
    AjaxHelpers.selectWinner(this.state.id, winner).then(res => {

      let winningArt = res.competition.winning_art;
      this.props.selectWinner(winningArt);
      AjaxHelpers.getBattle().then(res => {
        this.stageCompetition(res);
      });
    });
  }
  
  render(){
    return (
      <div className='competition'>
        <Loader show={this.state.loading} message={'loading'}  >
          <Art key={this.state.art.id} art={this.state.art} />
          <Art key={this.state.challenger.id} art={this.state.challenger} />

          <div className='share-buttons'>

            <p>Share This Battle!</p>

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
        </Loader>
      </div>
    )
  }
}

export default Competition