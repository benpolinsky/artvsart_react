import React from 'react';
import {connect} from 'react-redux';
import {fetchAllArt, fetchArt} from '../../actions/art.js';
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
          rowAction={this.props.showArt.bind(this, this.context.router)}
        />
      </DefaultLoader>
    )
  
  }
}

ArtList.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (state) => ({
  art: state.artState.allArt,
  showLoader: state.artState.fetching
});

const mapDispatchToProps = (dispatch) => ({
  getAllArt(){
    dispatch(fetchAllArt());
  },
  showArt(router, id){
    router.push(`art/${id}`)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtList);
