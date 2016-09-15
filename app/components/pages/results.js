import React from 'react';
import Art from '../art.js';
import AjaxHelpers from '../../utils/ajax_helpers.js';

export default class Results extends React.Component {
  
  componentWillMount(){
    this.state = {
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
  
  componentDidMount(){
    AjaxHelpers.fetchResults().then(results => {
      this.setState({
        top_winner: results.art_results.overall_winner,
        top_loser: results.art_results.overall_loser,
        best_records: results.art_results.top_winners,
        worst_records: results.art_results.top_losers
      })
    }) 
  }
  
  render(){
    const winner = this.state.top_winner;
    const loser = this.state.top_loser;
    return (
      <div className="resultsPage col-xs-12">
    
        <div className='resultsTopWinner resultsTop'>
          <h2>Top Winner: </h2>
          <p>Number of Wins: {winner.winning_count}</p>
          <Art key={winner.id} art={winner} no_voting={true} />
        </div>
    
        <div className='resultsTopLoser resultsTop'> 
          <h2>Top Loser: </h2>
          <p>Number of Losses: {loser.losing_count}</p>
          <Art key={loser.id} art={loser} no_voting={true} />
        </div>
               
         <div className="bestRecords otherRecords">
          <h2>Most Wins</h2>
             {this.state.best_records.map(record => {
               return <Art key={record.id} art={record} no_voting={true} />
             })}
         </div>
         <div className="worstRecords otherRecords">
             <h2>Most Losses</h2>
             {this.state.worst_records.map(record => {
               return <Art key={record.id} art={record} no_voting={true} />
             })}
         </div>
      </div>
    )
  }
}