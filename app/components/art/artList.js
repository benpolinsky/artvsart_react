import React from 'react';
import {connect} from 'react-redux';
import {fetchAllArt} from '../../actions/art.js';
import QuickTable from '../quickTable.js';
import Loader from 'react-loader-advanced';
import loaderStyles from '../../styles/loader.js';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ArtList extends React.Component {

  componentWillMount(){
    this.props.getAllArt();
  }
  
  render(){
    const circularLoader = <MuiThemeProvider><CircularProgress /></MuiThemeProvider>
    
    return (
      <Loader show={this.props.showLoader} foregroundStyle={loaderStyles.foreground} backgroundStyle={loaderStyles.background} message={circularLoader} >
        <QuickTable 
          data={this.props.art}
          title="All Art"
          fields={['id', 'name', 'creator', 'status', 'date']}
        />
      </Loader>
    )
  
  }
}

const mapStateToProps = (state) => ({
  art: state.artState.allArt,
  showLoader: state.artState.fetching
});

const mapDispatchToProps = (dispatch) => ({
  getAllArt(){
    dispatch(fetchAllArt());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtList);
