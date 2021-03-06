import React from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {WinLossBar} from './winLossBar.js';
import Category from './categories/category.js'
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
        <Helmet title="Art Vs Art: Leaderboard" />
         <div className="bestRecords otherRecords">
          <MuiThemeProvider>
            <List>
              <Subheader>Leaderboard</Subheader>
             {this.props.results.map(record => {
               const primaryText = `${record.name} by ${record.creator}`;
               return (
                 <ListItem 
                   key={record.id}
                   primaryText={primaryText}
                   secondaryText={
                     <div style={{height: 36}}>
                       <Category align={'left'} category={record.category} mergedStyles={{backgroundColor: 'white', color: 'black'}} />
                       <WinLossBar data={record} /> 
                     </div>
                   }
                   leftAvatar={<img width='50' style={{top: 19}} src={record.image} />}
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

LeaderBoard.propTypes = {
  results: React.PropTypes.array.isRequired,
  getResults: React.PropTypes.func.isRequired
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