import React from 'react';
import {connect} from 'react-redux';
import {WinLossBar} from './winLossBar.js';
import {fetchResults} from '../actions/results.js';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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


class LeaderBoard extends React.Component{
  componentDidMount(){
    this.props.getResults()
  }
  
  render(){
    return(
      <div className="resultsPage">        
         <div className="bestRecords otherRecords">
          <MuiThemeProvider>
            <List>
              <Subheader>Leaderboard</Subheader>
             {this.props.results.map(record => {
               return (
                 <ListItem 
                   key={record.id}
                   primaryText={record.name}
                   secondaryText={<WinLossBar data={record} />}
                   leftAvatar={<img width='30' src={record.image} />}
                 />

               )
             })}
             </List>
            </MuiThemeProvider>
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

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);