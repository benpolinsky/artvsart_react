import React from 'react';
import Art from './art.js';

export const ResultsList = ({results}) => {
  return(
    <div className="resultsPage col-xs-12">
      <div className='resultsTopWinner resultsTop'>
        <h2>Top Winner: </h2>
        <p>Number of Wins: {results.top_winner.winning_count}</p>
        <Art key={results.top_winner.id} art={results.top_winner} no_voting={true} />
      </div>

      <div className='resultsTopLoser resultsTop'> 
        <h2>Top Loser: </h2>
        <p>Number of Losses: {results.top_loser.losing_count}</p>
        <Art key={results.top_loser.id} art={results.top_loser} no_voting={true} />
      </div>
         
       <div className="bestRecords otherRecords">
        <h2>Most Wins</h2>
           {results.best_records.map(record => {
             return <Art key={record.id} art={record} no_voting={true} />
           })}
       </div>
       <div className="worstRecords otherRecords">
           <h2>Most Losses</h2>
           {results.worst_records.map(record => {
             return <Art key={record.id} art={record} no_voting={true} />
           })}
       </div>
    </div>
  )
}