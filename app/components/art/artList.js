import React from 'react';
import {connect} from 'react-redux';
import {fetchAllArt} from '../../actions/art.js'
import QuickTable from '../quickTable.js';

class ArtList extends React.Component {

  componentWillMount(){
    this.props.getAllArt();
  }
  
  render(){
    return (<QuickTable 
            data={this.props.art}
            title="All Art"
            fields={['id', 'name', 'creator', 'status', 'date']}
          />
    )
  
  }
}

const mapStateToProps = (state) => ({
  art: state.artState.allArt
});

const mapDispatchToProps = (dispatch) => ({
  getAllArt(){
    dispatch(fetchAllArt());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtList);
