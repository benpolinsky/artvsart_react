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
        best_records: results.art_results.top_winners
      })
    }) 
  }
  
  render(){
    const winner = this.state.top_winner;
    const loser = this.state.top_loser;
    return (
      <div>
        <div className='resultsTopWinner'>
          <h2>Top Winner: </h2>
          <p>Number of Wins: {winner.winning_count}</p>
          <Art key={winner.id} 
               id={winner.id} 
               name={winner.name} 
               description={winner.description}
               image={winner.image}
               no_voting={true}
               />
        </div>
        <div className='resultsTopLoser'> 
          <h2>Top Loser: </h2>
          <p>Number of Losses: {loser.losing_count}</p>
          <Art key={loser.id} 
               id={loser.id} 
               name={loser.name} 
               description={loser.description}
               image={loser.image}
               no_voting={true}
               />
        </div>
               
         <div className="bestRecords">
          <h2>Best Records</h2>
             {this.state.best_records.map(record => {
               return (<Art key={record.id} 
                    id={record.id} 
                    name={record.name} 
                    description={record.description}
                    image={record.image}
                    no_voting={true}
                    />)
             })}
         </div>
         <div className="worstRecords">
             <h2>Worst Records</h2>
             {this.state.worst_records.map(record => {
               return (<Art key={record.id} 
                    id={record.id} 
                    name={record.name} 
                    description={record.description}
                    image={record.image}
                    no_voting={true}
                    />)
             })}
         </div>
      </div>
    )
  }
}