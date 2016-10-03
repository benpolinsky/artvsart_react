import React from 'react';
import Art from '../art.js';
import {fetchResults} from '../../utils/ajaxHelpers.js';
import {ResultsList} from '../resultsList.js'
export default class ResultsContainer extends React.Component {
  
  componentWillMount(){
    this.state = {
      results: {
        top_winner: {
          name: ""
        },
        top_loser: {
          name: ""
        },
        best_records: [
        ],
        worst_records: []
      }
    }
  }
  
  componentDidMount(){
    fetchResults().then(results => {
      this.setState({
        results: {
          top_winner: results.art_results.overall_winner,
          top_loser: results.art_results.overall_loser,
          best_records: results.art_results.top_winners,
          worst_records: results.art_results.top_losers
        }        
      });
    });
  }
  
  render(){
    return (<ResultsList results={this.state.results} />)
  }
}