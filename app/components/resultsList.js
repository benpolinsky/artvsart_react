import React from 'react';
import {connect} from 'react-redux';
import Art from './art.js';
import {WinLossBar} from './winLossBar.js';
import {fetchResults} from '../actions/results.js';

const newStyles = {
  art: {
    float: 'left',
    clear: 'both',
    width: '100%',
    boxSizing: 'border-box',
    padding: '30px' 
  },
  artImage: {
    width: 100
  }
};


class ResultsList extends React.Component{
  componentDidMount(){
    this.props.getResults()
  }
  
  render(){
    return(
      <div className="resultsPage col-xs-12">        
         <div className="bestRecords otherRecords">
          <h2>Most Wins</h2>
             {this.props.results.map(record => {
               return (
                 <div key={record.id}>
                   <Art art={record} styles={newStyles} no_voting={true} />
                   <WinLossBar data={record} />
                 </div>
               )
             })}
         </div>
      </div>
    )
  }
  
}

const mapStateToProps = (store) => ({
  results: store.resultsState.results
});

const mapDispatchToProps = (dispatch) => ({
  getResults(){
    dispatch(fetchResults());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultsList);