import React from 'react';
import {connect} from 'react-redux';
import {fetchAllArt} from '../../actions/art.js';
import DefaultLoader from '../defaultLoader.js';
import QuickTable from '../quickTable.js';


class ArtList extends React.Component {

  componentWillMount(){
    this.props.getAllArt();
  }
  
  render(){    
    return (
      <DefaultLoader showing={this.props.showLoader}>
        <QuickTable 
          data={this.props.art}
          title="All Art"
          fields={['id', 'name', 'creator', 'status', 'date']}
        />
      </DefaultLoader>
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
